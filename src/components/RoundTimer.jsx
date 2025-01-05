import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setElapsedTime} from "../redux/gameSlice";

const RoundTimer = ({running, roundStarted}) => {

  const {
    leftSeconds,
    currentTeam,
    timer: roundDuration,
    elapsedTime
  } = useSelector(state => state.game);
  const dispatch = useDispatch();
  const [concreteRoundDuration, setConcreteRoundDuration] = useState(
      Number(roundDuration) + Number((leftSeconds[currentTeam] || 0))
  )

  useEffect(() => {
    let timer
    if (running) {
      timer = setInterval(() => {
        if (elapsedTime <= concreteRoundDuration - 1) {
          dispatch(setElapsedTime(elapsedTime + 1));
        } else {
          clearInterval(timer);
        }

      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentTeam, leftSeconds, roundDuration, running, elapsedTime]);

  return (
      <p>Осталось времени: {concreteRoundDuration - elapsedTime}</p>
  )
}

export default RoundTimer;