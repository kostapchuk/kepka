import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setRoundInProgress, setTimerRunning} from "../redux/gameSlice";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import {setLastClick, updateRoundWordStatsDuration} from "../redux/statisticsSlice";

const AlarmTimer = () => {

    const dispatch = useDispatch();

    const audioRef = useRef(new Audio('/alarm-bell.mp3'));

    const {
        leftSeconds,
        timerRunning,
        currentWord,
        tour,
        currentTeam,
        currentGameId,
        timer: roundDuration
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
        dispatch(setCurrentPage(Pages.ROUND_SCORE_PAGE));
        dispatch(setRoundInProgress(false));
        dispatch(setLastClick(null));
    };

    useEffect(() => {
        if (timerRunning) {
            const audioPlayTimeout = setTimeout(() => {
                audioRef.current.play();
                const audioPauseTimeout = setTimeout(() => {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    onRoundFinished();
                }, 1500)
                return () => clearTimeout(audioPauseTimeout);
            }, (leftSeconds[currentTeam] - 1) * 1000)
            return () => clearTimeout(audioPlayTimeout);
        }
    }, [currentTeam, leftSeconds, roundDuration, timerRunning]);

    return (
        <></>
    )
}

export default AlarmTimer;
