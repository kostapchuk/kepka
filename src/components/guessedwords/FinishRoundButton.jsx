import {useSelector} from "react-redux";
import React from 'react';

import {
    setActualLeftTimeInTour,
    setCurrentTeam,
    setCurrentWord,
    setElapsedTime,
    setLeftSeconds,
    setLeftWords,
    setRoundAnsweredWords,
    setRoundWords,
    setScore,
    setTour,
    setTourChangeModalOpen
} from "../../redux/gameSlice";
import {distinct, shuffle} from "../../util/arrayUtils";
import {setCurrentPage} from "../../redux/pageSlice";
import {Pages} from "../../routes";
import {updatePlayer} from "../../redux/playersSlice";
import PrimaryButton from "../ui/PrimaryButton";
import TimeLeftInRoundModal from "../timeleftinround/TimeLeftInRoundModal";
import useTranslationAndDispatch from "../../hooks/useTranslationAndDispatch";
import {addStats, clearRoundWordStats} from "../../redux/statisticsSlice";
import {TOURS} from "../../types/tours";

const FinishRoundButton = () => {

    const {
        leftWords: tourLeftWords,
        tour,
        leftSeconds,
        words,
        currentTeam,
        currentGameId,
        score,
        elapsedTime,
        timer: roundDuration,
        roundAnsweredWords
    } = useSelector(state => state.game);
    const {roundWordStats} = useSelector(state => state.statistics)
    const {dispatch, t} = useTranslationAndDispatch()
    const players = useSelector(state => state.players);
    const currentAsker = players.filter(p => p.gameId === currentGameId && p.teamId === currentTeam && p.asker)[0]

    const finishRound = () => {
        const actualLeftWords = tourLeftWords.filter(item => !roundAnsweredWords.includes(item))
        const leftTime = leftSeconds[currentTeam] - elapsedTime
        const actualLeftTime = Number((tour === TOURS.CROCODILE ? Math.round(leftTime / 2) : leftTime))
        dispatch(setActualLeftTimeInTour(actualLeftTime))
        if (actualLeftWords.length === 0 && tour !== TOURS.ONE_WORD && leftTime >= 1) {
            dispatch(setTourChangeModalOpen(true))
        } else {
            doFinishRound(false);
        }
    }

    const doFinishRound = (continueNow) => {
        dispatch(setCurrentPage(Pages.GAME_PAGE));
        const actualLeftWords = tourLeftWords.filter(item => !roundAnsweredWords.includes(item))
        roundWordStats.filter(s => roundAnsweredWords.includes(s.word)).forEach(s => dispatch(addStats(s)))
        dispatch(clearRoundWordStats());
        dispatch(setLeftWords(shuffle(actualLeftWords)))
        const leftTime = leftSeconds[currentTeam] - elapsedTime
        const continueNowTime = Number((tour === TOURS.CROCODILE ? Math.round(leftTime / 2) : leftTime))
        const continueLaterTime = continueNowTime + Number(roundDuration)
        if (actualLeftWords.length === 0 && tour !== TOURS.ONE_WORD && leftTime >= 1) {
            const newLeftSeconds = {
                ...leftSeconds,
                [currentTeam]: continueNow ? continueNowTime : continueLaterTime
            }
            dispatch(setLeftSeconds(newLeftSeconds));
        } else {
            const newLeftSeconds = {
                ...leftSeconds,
                [currentTeam]: roundDuration
            }
            dispatch(setLeftSeconds(newLeftSeconds))
        }
        dispatch(setElapsedTime(0));
        const newScore = {
            ...score,
            [currentTeam]: score[currentTeam] + roundAnsweredWords.length
        }
        dispatch(setScore(newScore))
        dispatch(setRoundWords([]));
        dispatch(setRoundAnsweredWords([]));
        dispatch(setCurrentWord(''))
        if (!continueNow) {
            rotatePlayer();
            rotateTeam();
        }
        if (actualLeftWords.length === 0) {
            dispatch(setLeftWords(shuffle(words)))
            if (tour === TOURS.ALIAS) {
                dispatch(setTour(TOURS.CROCODILE));
                dispatch(setTourChangeModalOpen(true));
            } else if (tour === TOURS.CROCODILE) {
                dispatch(setTour(TOURS.ONE_WORD));
                dispatch(setTourChangeModalOpen(true));
            } else if (tour === TOURS.ONE_WORD) {
                dispatch(setCurrentPage(Pages.RESULTS_PAGE));
            }
        }
    }

    const rotatePlayer = () => {
        const currentTeamPlayers = players.filter(p => p.gameId === currentGameId && p.teamId === currentTeam)
        const currentAskerIdx = currentTeamPlayers.indexOf(currentAsker)
        let newAskerIdx
        if (currentAskerIdx === currentTeamPlayers.length - 1) {
            newAskerIdx = 0
        } else {
            newAskerIdx = currentAskerIdx + 1
        }
        const newAsker = currentTeamPlayers[newAskerIdx]
        const generalCurrentAskerIndex = players.indexOf(currentAsker)
        const generalNewAskerIndex = players.indexOf(newAsker)
        dispatch(updatePlayer({
            index: generalCurrentAskerIndex,
            updatedInfo: {...currentAsker, asker: 0}
        }))
        dispatch(updatePlayer({index: generalNewAskerIndex, updatedInfo: {...newAsker, asker: 1}}))
    }

    const rotateTeam = () => {
        const teamNames = distinct(players.filter(p => p.gameId === currentGameId).map(p => p.teamId))
        const currentTeamIndex = teamNames.indexOf(currentTeam)
        let newTeam
        if (currentTeamIndex === teamNames.length - 1) {
            newTeam = teamNames[0]
            dispatch(setCurrentTeam(newTeam))
        } else {
            newTeam = teamNames[currentTeamIndex + 1]
            dispatch(setCurrentTeam(newTeam))
        }
    }

    return (
        <>
            <TimeLeftInRoundModal doFinishRound={doFinishRound}/>
            <PrimaryButton onClick={finishRound} content={t('continue')}/>
        </>
    )
}

export default FinishRoundButton
