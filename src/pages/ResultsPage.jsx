import {useDispatch, useSelector} from "react-redux";
import {reset as resetPage} from "../redux/pageSlice";
import {reset as resetGame} from "../redux/gameSlice";
import {reset as resetPlayers} from "../redux/playersSlice";
import ResetFullGame from "../components/ResetFullGame";

const WelcomePage = () => {

  const dispatch = useDispatch();
  const {score} = useSelector(state => state.game);

  const resetFullGame = () => {
    dispatch(resetGame)
    dispatch(resetPage)
    dispatch(resetPlayers)
  }

  return (
      <div className="App">
        {Object.entries(score).map(([team, score]) => (
            <p key={Math.random()}>{team}: {score}</p>
        ))}
        <ResetFullGame/>
      </div>
  )
}

export default WelcomePage;