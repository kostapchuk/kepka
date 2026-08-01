import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import {setTimerRunning} from "../../redux/gameSlice";

const RoundTimer = () => {

  const {
    leftSeconds,
    currentTeam,
    timerRunning,
    timer: roundDuration,
    elapsedTime,
    roundInProgress
  } = useSelector(state => state.game);

  const dispatch = useDispatch();

  // AlarmTimer owns the single clock and derives elapsedTime from the round
  // deadline; this component only renders, so display and alarm cannot disagree.
  const left = Number(leftSeconds[currentTeam]) - elapsedTime;
  const fillPercentage = Math.min((elapsedTime / roundDuration) * 100, 100);

  function secondsToString(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const progressStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '150px',
    width: `${fillPercentage}%`,
    backgroundColor: '#7A51EC66',
    transition: 'width 1s linear',
    zIndex: 1
  };

  return (
      <>
        <Box sx={progressStyle}>
        </Box>
        <Box
            sx={{
              height: '150px',
              position: 'fixed',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: "center",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#F0F0F0',
              paddingRight: '16px',
              paddingLeft: '16px',
            }}
        >
          <Typography variant="h1" sx={{
            fontWeight: '600',
            fontSize: '36px',
            opacity: !roundInProgress ? '40%' : '100%',
            zIndex: 2
          }}>
            {secondsToString(left)}
          </Typography>
          <Button disabled={true}
                  onClick={() => dispatch(setTimerRunning(!timerRunning))}
                  sx={{zIndex: 2, visibility: "hidden"}}>
            <img style={{opacity: true ? '40%' : '100%'}}
                 src="/icon-button-timer.svg" alt="Pause"/>
          </Button>
        </Box>
      </>
  )
}

export default RoundTimer;
