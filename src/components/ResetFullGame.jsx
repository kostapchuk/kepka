import {useDispatch} from "react-redux";
import {reset as resetPage} from "../redux/pageSlice";
import {reset as resetGame} from "../redux/gameSlice";
import {reset as resetPlayers} from "../redux/playersSlice";

const ResetFullGame = () => {

  const dispatch = useDispatch();

  const resetFullGame = () => {
    dispatch(resetGame())
    dispatch(resetPage())
    dispatch(resetPlayers())
  }

  return (
      <div className="App">
        <br/>
        <br/>
        <br/>
        <br/>
        <button onClick={resetFullGame}>Reset</button>
      </div>
  )
}

export default ResetFullGame;