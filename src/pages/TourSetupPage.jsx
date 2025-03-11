import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import {
    setCurrentTeam,
    setLeftSeconds,
    setLeftWords,
    setTimer,
    setTour,
    setWords,
    setWordsCount
} from "../redux/gameSlice";
import {availableWords} from "../util/words";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {FormControl, MenuItem, Select, TextField, Typography} from "@mui/material";
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
        new Set(currentPlayersInGame.map(p => p.teamId)).forEach(teamId => {
            leftSeconds[teamId] = timer
        })
        dispatch(setLeftSeconds(leftSeconds))
    }

    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.focus();
    };

    return (
        <Stack spacing={0}>
            <Typography variant="h3" sx={{fontSize: "24px", fontWeight: "600"}}>Настройка игры 3 / 3</Typography>

            <TextField
                inputRef={inputRef}
                value={timer}
                onChange={(e) => dispatch(setTimer(e.target.value))}
                onFocus={handleFocus}
                label="Длительность раунда"
                variant="outlined"
                fullWidth
            />
            <PrimaryButton onClick={goToGamePage} content="Перейти к игре"/>
        </Stack>
    );
};

export default TourSetupPage;
