import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

const AlarmTimer = ({running, onTimerEnd}) => {

  const audioRef = useRef(new Audio('/alarm-bell.mp3'));
  const {
    leftSeconds,
    currentTeam,
    timer: roundDuration
  } = useSelector(state => state.game);
  const [concreteRoundDuration, setConcreteRoundDuration] = useState(
      Number(roundDuration) + Number((leftSeconds[currentTeam] || 0))
  )

  useEffect(() => {
    if (running) {
      const audioPlayTimeout = setTimeout(() => {
        audioRef.current.play();
        const audioPauseTimeout = setTimeout(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          onTimerEnd();
        }, 1500)
        return () => clearTimeout(audioPauseTimeout);
      }, (concreteRoundDuration - 1) * 1000)
      return () => clearTimeout(audioPlayTimeout);
    }
  }, [currentTeam, leftSeconds, roundDuration, running]);

  return (
      <></>
  )
}

export default AlarmTimer;