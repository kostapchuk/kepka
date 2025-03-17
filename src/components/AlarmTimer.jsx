import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import React from 'react';
import {setRoundInProgress, setTimerRunning} from "../redux/gameSlice";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";

const AlarmTimer = () => {

  const dispatch = useDispatch();

  const audioRef = useRef(new Audio('/alarm-bell.mp3'));

  const {
    leftSeconds,
    currentTeam,
    timerRunning,
    timer: roundDuration
  } = useSelector(state => state.game);

  const onRoundFinished = () => {
    dispatch(setTimerRunning(false));
    dispatch(setCurrentPage(Pages.ROUND_SCORE_PAGE));
    dispatch(setRoundInProgress(false));
  };

  useEffect(() => {
    if (timerRunning) {
      const audioPlayTimeout = setTimeout(() => {
        audioRef.current.play();
        const audioPauseTimeout = setTimeout(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          onRoundFinished();
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
