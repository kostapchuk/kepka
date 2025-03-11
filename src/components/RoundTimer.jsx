import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setElapsedTime, setTimerRunning} from "../redux/gameSlice";
import {Box, Typography} from "@mui/material";
import Button from "@mui/material/Button";

const RoundTimer = () => {

    const {
        leftSeconds,
        currentTeam,
        timerRunning,
        timer: roundDuration,
        elapsedTime
    } = useSelector(state => state.game);
    const dispatch = useDispatch();
    const [fillPercentage, setFillPercentage] = useState(0);

    useEffect(() => {
        let timer
        if (timerRunning) {
            timer = setInterval(() => {
                if (elapsedTime <= leftSeconds[currentTeam] - 1) {
                    const percentage = Math.min((elapsedTime / roundDuration) * 100, 100);
                    setFillPercentage(percentage);
                    dispatch(setElapsedTime(elapsedTime + 1));
                } else {
                    clearInterval(timer);
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [currentTeam, leftSeconds, roundDuration, timerRunning, elapsedTime]);

    function secondsToString(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    const disabled = true

    return (
        <Box
            sx={{
                position: 'fixed',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: "center",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#F0F0F0',
                padding: '16px'
            }}
        >
            <Typography variant="h1" sx={{fontWeight: '600', fontSize: '36px', opacity: disabled ? '40%' : '100%'}}>
                {secondsToString(leftSeconds[currentTeam] - elapsedTime)}
            </Typography>
            <Button disabled={disabled} onClick={() => dispatch(setTimerRunning(!timerRunning))}>
                <img style={{opacity: disabled ? '40%' : '100%'}} src="/icon-button-timer.svg" alt="Pause"/>
            </Button>
        </Box>
    )
}

export default RoundTimer;
