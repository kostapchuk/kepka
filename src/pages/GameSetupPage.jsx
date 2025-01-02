import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import {
  setCurrentTeam,
  setLeftWords, setTimer,
  setTour,
  setWords, setWordsCount
} from "../redux/gameSlice";
import ResetFullGame from "../components/ResetFullGame";
import {availableWords} from "../util/words";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import {useRef} from "react";

const GameSetupPage = () => {

  const {timer, wordsCount, currentGameId} = useSelector(state => state.game);
  const dispatch = useDispatch();
  const players = useSelector(state => state.players);

  const goToGamePage = () => {
    dispatch(setCurrentPage(Pages.GAME_PAGE));
    const words = randomWords()
    dispatch(setWords(words))
    dispatch(setLeftWords(words))
    dispatch(setTour('Alias'))
    const currentPlayersInGame = players.filter(p => p.gameId === currentGameId)
    dispatch(setCurrentTeam(currentPlayersInGame[Math.floor(Math.random() * currentPlayersInGame.length)].teamId))
  }

  function randomWords() {
    const shuffledArray = availableWords.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, wordsCount);
  }

  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
      <Stack spacing={2}>
        <p>Настройки игры</p>
        <p>Длительность раунд, секунды: {timer}</p>
        <TextField
            inputRef={inputRef}
            value={timer}
            onChange={(e) => dispatch(setTimer(e.target.value))}
            onFocus={handleFocus}
            label="Type something"
            variant="outlined"
            fullWidth
        />
        <p>Количество слов в игре: {wordsCount}</p>
        <input
            key={Math.random()}
            type="text"
            value={wordsCount}
            onChange={(e) => dispatch(setWordsCount(e.target.value))}
        />
        <Button variant="contained" onClick={goToGamePage}>
          Начать игру
        </Button>
        <ResetFullGame/>
      </Stack>
  );
};

export default GameSetupPage;