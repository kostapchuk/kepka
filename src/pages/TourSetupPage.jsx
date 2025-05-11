import React, {useState, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import ScrollablePageWithStickyFooter from "../components/shared/ScrollablePageWithStickyFooter";
import RoundDurationInput from "../components/toursetup/RoundDurationInput";
import PrimaryButton from "../components/shared/PrimaryButton";
import {setCurrentPage} from "../redux/pageSlice";
import {setCurrentTeam, setLeftSeconds, setScore, setShowScoreDuringGame, setTimer, setTour} from "../redux/gameSlice";
import {Pages} from "../routes";
import {random} from "../util/arrayUtils";
import useTranslationAndDispatch from "../hooks/useTranslationAndDispatch";
import {TOURS} from "../types/tours";
import SetupHeader from "../components/shared/SetupHeader";
import {Stack} from "@mui/material";
import LabeledInput from "@/components/shared/LabeledInput";
import Toggler from "@/components/shared/Toggler";

const TourSetupPage = () => {
    const dispatch = useDispatch();
    const {timer, currentGameId, showScoreDuringGame} = useSelector(state => state.game);
    const players = useSelector(state => state.players);
    const {t} = useTranslationAndDispatch();

    const [error, setError] = useState('');

    const validateTimer = () => {
        const intRegex = /^[0-9]+$/;
        if (!intRegex.test(timer)) return t('only-positive-allowed');
        const num = Number(timer);
        if (num === 0 || num >= 600) return t('round-duration-err');
        return '';
    };

    const handleContinue = useCallback(() => {
        const validationMessage = validateTimer();
        if (validationMessage) {
            setError(validationMessage);
            return;
        }

        setError('');
        dispatch(setTour(TOURS.ALIAS));
        dispatch(setCurrentPage(Pages.GAME_PAGE));

        const currentPlayers = players.filter(p => p.gameId === currentGameId);
        dispatch(setCurrentTeam(random(currentPlayers).teamId));

        const teamIds = [...new Set(currentPlayers.map(p => p.teamId))];
        const secondsMap = {};
        const scoreMap = {};
        teamIds.forEach(id => {
            secondsMap[id] = timer;
            scoreMap[id] = 0;
        });

        dispatch(setScore(scoreMap));
        dispatch(setLeftSeconds(secondsMap));
    }, [timer, players, dispatch, currentGameId]);

    const onBackClick = () => dispatch(setCurrentPage(Pages.WORDS_SETUP_PAGE));
    const toggleScoreDisplay = () => dispatch(setShowScoreDuringGame(!showScoreDuringGame));

    return (
        <ScrollablePageWithStickyFooter
            footer={<PrimaryButton onClick={handleContinue} content={t('go-to-game')} />}
        >
            <Stack gap={3}>
                <SetupHeader onBackClick={onBackClick} title={`${t('game-settings')} 3 / 3`} />
                <Stack gap={2.5}>
                    <RoundDurationInput
                        timer={timer}
                        error={error}
                        onChange={(e) => dispatch(setTimer(e.target.value))}
                        label={t('round-duration')}
                    />
                    <LabeledInput label={t('show-score-during-game')}>
                        <Toggler
                            dataCy="show-score-during-game-toggler"
                            checked={showScoreDuringGame}
                            onChange={toggleScoreDisplay}
                        />
                    </LabeledInput>
                </Stack>
            </Stack>
        </ScrollablePageWithStickyFooter>
    );
};

export default TourSetupPage;
