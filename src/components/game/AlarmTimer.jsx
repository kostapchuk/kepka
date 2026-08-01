import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    setElapsedTime,
    setRoundDeadline,
    setRoundInProgress,
    setTimerRunning
} from "../../redux/gameSlice";
import {setCurrentPage} from "../../redux/pageSlice";
import {Pages} from "../../routes";
import {setLastClick, updateRoundWordStatsDuration} from "../../redux/statisticsSlice";
import {ALARM_MS, playAlarm, stopAlarm} from "../../util/alarm";
import {remainingSeconds} from "../../util/roundTime";

const TICK_MS = 250;

const AlarmTimer = () => {

    const dispatch = useDispatch();
    const {
        leftSeconds,
        timerRunning,
        roundDeadline,
        elapsedTime,
        currentWord,
        tour,
        currentTeam,
        currentGameId
    } = useSelector(state => state.game);
    const {lastClick} = useSelector(state => state.statistics);
    const players = useSelector(state => state.players);

    const onRoundFinished = () => {
        const currentTime = performance.now();
        const timeDifference = currentTime - lastClick;
        const currentWordStats = {
            word: currentWord,
            tour: tour,
            player: players.filter(
                p => p.gameId === currentGameId && p.teamId === currentTeam
                    && p.asker)[0].name,
            duration: timeDifference.toFixed(1),
            team: currentTeam
        }
        dispatch(updateRoundWordStatsDuration(currentWordStats));
        dispatch(setTimerRunning(false));
        dispatch(setRoundDeadline(null));
        dispatch(setCurrentPage(Pages.ROUND_SCORE_PAGE));
        dispatch(setRoundInProgress(false));
        dispatch(setLastClick(null));
    };

    // The tick runs every 250ms but the handlers below depend on values that
    // change every second, so read them through a ref instead of restarting the
    // interval - a restart mid-round would drop the alarm.
    const latest = useRef();
    latest.current = {
        onRoundFinished,
        roundSeconds: Number(leftSeconds[currentTeam]),
        elapsedTime
    };

    const firedRef = useRef(false);

    useEffect(() => {
        if (!timerRunning || !roundDeadline) return;
        firedRef.current = false;
        let finishTimeout;

        const tick = () => {
            const {onRoundFinished, roundSeconds, elapsedTime} = latest.current;
            const remaining = remainingSeconds(roundDeadline);

            const nextElapsed = roundSeconds - remaining;
            if (nextElapsed !== elapsedTime) {
                dispatch(setElapsedTime(nextElapsed));
            }

            if (remaining > 0 || firedRef.current) return;
            firedRef.current = true;
            clearInterval(interval);
            playAlarm().catch(e => console.error("Can't play alarm", e));
            // Scheduled unconditionally: a blocked or failed alarm must not
            // leave the round hanging.
            finishTimeout = setTimeout(() => {
                stopAlarm();
                onRoundFinished();
            }, ALARM_MS);
        };

        const interval = setInterval(tick, TICK_MS);
        tick(); // catch a deadline already in the past (reload, backgrounded tab)

        return () => {
            clearInterval(interval);
            clearTimeout(finishTimeout);
            // The round can also end from elsewhere (words ran out) mid-alarm.
            if (firedRef.current) stopAlarm();
        };
    }, [timerRunning, roundDeadline, dispatch]);

    return (
        <></>
    )
}

export default AlarmTimer;
