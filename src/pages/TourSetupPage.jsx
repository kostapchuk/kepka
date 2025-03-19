import {useSelector} from "react-redux";
import React, {useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import {setCurrentTeam, setLeftSeconds, setScore, setShowScoreDuringGame, setTimer, setTour} from "../redux/gameSlice";
import {random} from "../util/arrayUtils";
import PrimaryButton from "../components/PrimaryButton";
import {PurpleSwitcherNoLabel} from "../components/Switcher";
import ScrollablePageWithStickyFooter from "../components/ScrollablePageWithStickyFooter";
import useTranslationAndDispatch from "../hooks/useTranslationAndDispatch";
import {TOURS} from "../components/FinishRoundButton";

const TourSetupPage = () => {

    const {timer, currentGameId, showScoreDuringGame} = useSelector(state => state.game);
    const {dispatch, t} = useTranslationAndDispatch();
    const players = useSelector(state => state.players);
    const [error, setError] = useState('');

    const goToGamePage = () => {
        const intDigits = /^[0-9]+$/;
        if (!intDigits.test(timer)) {
            setError(t('only-positive-allowed'));
            return;
        }
        const timerNum = Number(timer);
        if (timerNum === 0 || timerNum >= 600) {
            setError(t('round-duration-err'));
            return;
        }
        setError('');

        dispatch(setCurrentPage(Pages.GAME_PAGE));
        dispatch(setTour(TOURS.ALIAS))
        const currentPlayersInGame = players.filter(p => p.gameId === currentGameId)
        dispatch(setCurrentTeam(random(currentPlayersInGame).teamId))
        const leftSeconds = {}
        const newScore = {}
        new Set(currentPlayersInGame.map(p => p.teamId)).forEach(teamId => {
            leftSeconds[teamId] = timer
            newScore[teamId] = 0
        })
        dispatch(setScore(newScore))
        dispatch(setLeftSeconds(leftSeconds))
    }

    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.focus();
    };

    const onBackClick = () => {
        dispatch(setCurrentPage(Pages.WORDS_SETUP_PAGE));
    }

    const handleChangeSwitcher = () => {
        dispatch(setShowScoreDuringGame(!showScoreDuringGame));
    };

    const children = <>
        <Box sx={{display: "flex", mb: 1}}>
            <img src="/back.svg" alt="Back" onClick={onBackClick} style={{marginRight: '12px'}}/>
            <Typography variant="h3" sx={{fontSize: "24px", fontWeight: "600"}}>{t('game-settings')} 3 / 3</Typography>
        </Box>
        <Typography sx={{fontSize: "14px", color: "#6B6B6B", mt: 3, mb: 0.5}}>
            {t('round-duration')}
        </Typography>
        <TextField
            type="tel"
            inputRef={inputRef}
            sx={{
                borderRadius: '12px',
                '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                        borderColor: '#D1D1D1'
                    },
                    '&:hover fieldset': {
                        borderColor: '#D1D1D1'
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#7A51EC'
                    }
                },
                '&:focus': {
                    backgroundColor: 'transparent'
                },
                width: '100%'
            }}
            error={error !== ''}
            helperText={error}
            value={timer}
            onChange={(e) => dispatch(setTimer(e.target.value))}
            onFocus={handleFocus}
        />
        <Box>
            <Typography sx={{fontSize: "14px", color: "#6B6B6B", mt: 2.5, mb: 0.5}}>
                {t('show-score-during-game')}
            </Typography>
            <PurpleSwitcherNoLabel
                checked={showScoreDuringGame}
                onChange={handleChangeSwitcher}
            />
        </Box>
    </>

    const footer = <PrimaryButton onClick={goToGamePage} content={t('go-to-game')}/>

    return (
        <ScrollablePageWithStickyFooter
            children={children}
            footer={footer}
        />
    );
};

export default TourSetupPage;
