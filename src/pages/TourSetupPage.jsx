import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import {
    setCurrentTeam,
    setLeftSeconds,
    setLeftWords, setScore,
    setTimer,
    setTour,
    setWords,
    setWordsCount
} from "../redux/gameSlice";
import {availableWords} from "../util/words";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {Box, FormControl, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useRef, useState} from "react";
import Footer from "../components/Footer";
import {random, shuffle} from "../util/arrayUtils";
import PrimaryButton from "../components/PrimaryButton";

const TourSetupPage = () => {

    const {timer, wordsCount, currentGameId} = useSelector(state => state.game);
    const dispatch = useDispatch();
    const players = useSelector(state => state.players);

    const goToGamePage = () => {
        dispatch(setCurrentPage(Pages.GAME_PAGE));
        const words = shuffle(availableWords).slice(0, wordsCount);
        dispatch(setWords(words))
        dispatch(setLeftWords(words))
        dispatch(setTour('Алиас'))
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

    return (
        <Stack>
            <Box sx={{display: "flex", marginBottom: "8px"}}>
                <img src="/back.svg" alt="Back" onClick={onBackClick} style={{marginRight: '12px'}}/>
                <Typography variant="h3" sx={{fontSize: "24px", fontWeight: "600"}}>Настройка игры 3 / 3</Typography>
            </Box>
            <Typography sx={{fontSize: "14px", color: "#6B6B6B", fontWeight: "500", marginTop: '24px'}}>Длительность раунда</Typography>
            <TextField
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
                    flex: 1,
                    minWidth: '50px',
                    marginBottom: '16px'
                }}
                value={timer}
                onChange={(e) => dispatch(setTimer(e.target.value))}
                onFocus={handleFocus}
            />
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#FFFFFF',
                    padding: '16px'
                }}
            >
                <PrimaryButton onClick={goToGamePage} content="Перейти к игре"/>
            </Box>
        </Stack>
    );
};

export default TourSetupPage;
