import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import {
  setCurrentTeam,
  setLeftWords,
  setTour,
  setWords
} from "../redux/gameSlice";
import ResetFullGame from "../components/ResetFullGame";
import {availableWords} from "../util/words";

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

  function randomWords(count = 42) {
    const shuffledArray = availableWords.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  }

  return (
      <div>
        <p>Game settings</p>
        <p>Round duration, seconds: {timer}</p>
        <p>Game words, count: {wordsCount}</p>
        <button onClick={goToGamePage}>
          Start game
        </button>
        <ResetFullGame/>
      </div>
  );
};

export default GameSetupPage;