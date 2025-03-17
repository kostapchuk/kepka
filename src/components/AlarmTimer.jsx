import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import React from 'react';

const AlarmTimer = ({onTimerEnd}) => {

  const audioRef = useRef(new Audio('/alarm-bell.mp3'));
  const {
    leftSeconds,
    currentTeam,
    timerRunning,
    timer: roundDuration
  } = useSelector(state => state.game);

  useEffect(() => {
    if (timerRunning) {
      const audioPlayTimeout = setTimeout(() => {
        audioRef.current.play();
        const audioPauseTimeout = setTimeout(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          onTimerEnd();
        }, 1500)
        return () => clearTimeout(audioPauseTimeout);
      }, (leftSeconds[currentTeam] - 1) * 1000)
      return () => clearTimeout(audioPlayTimeout);
    }
  }, [currentTeam, leftSeconds, roundDuration, timerRunning]);

  return (
      <></>
  )
}

export default AlarmTimer;
