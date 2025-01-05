import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setElapsedTime} from "../redux/gameSlice";

const RoundTimer = ({running}) => {

  const {
    leftSeconds,
    currentTeam,
    timer: roundDuration,
    elapsedTime
  } = useSelector(state => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer
    if (running) {
      timer = setInterval(() => {
        if (elapsedTime <= leftSeconds[currentTeam] - 1) {
          dispatch(setElapsedTime(elapsedTime + 1));
        } else {
          clearInterval(timer);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentTeam, leftSeconds, roundDuration, running, elapsedTime]);

  return (
      <p>Осталось времени: {leftSeconds[currentTeam] - elapsedTime}</p>
  )
}

export default RoundTimer;