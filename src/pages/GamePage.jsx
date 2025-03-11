import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import AlarmTimer from "../components/AlarmTimer";
import RoundTimer from "../components/RoundTimer";
import {random} from "../util/arrayUtils";
import {ButtonGroup} from "@mui/material";
import {setRoundAnsweredWords, setRoundEnded, setRoundWords, setTimerRunning} from "../redux/gameSlice";
import GameHeader from "../components/GameHeader";
import ScoresTab from "../components/ScoresTab";
import Button from "@mui/material/Button";
import GameTab from "../components/GameTab";

const GamePage = () => {
    const {
        leftSeconds,
        timerRunning,
    } = useSelector(state => state.game);
    const dispatch = useDispatch();
    const [showed, setShowed] = useState(false)
    const [currentBlock, setCurrentBlock] = useState('game')

    useEffect(() => {
    }, [leftSeconds, currentBlock]);


    const onRoundFinished = () => {
        dispatch(setTimerRunning(false));
        dispatch(setRoundEnded(true));
        setShowed(false);
    }


    const activeTabStyles = {
        backgroundColor: "#F0F0F0",
        fontSize: '16px',
        color: "#6B6B6B",
        fontWeight: '600',
        borderColor: '#D1D1D1',
        borderRadius: '100px'
    }
    const inactiveTabStyles = {
        backgroundColor: "#000000",
        fontSize: '16px',
        color: "#FFFFFF",
        fontWeight: '600',
        borderColor: '#D1D1D1',
        borderRadius: '100px'
    };

    return (
        <Stack spacing={2}>
            <GameHeader/>
            <ButtonGroup sx={{height: '58px', opacity: showed ? '40%' : '100%'}} fullWidth>
                <Button sx={currentBlock === 'game' ? activeTabStyles : inactiveTabStyles}
                        onClick={() => !showed && setCurrentBlock('team')}>Команда</Button>
                <Button sx={currentBlock === 'team' ? activeTabStyles : inactiveTabStyles}
                        onClick={() => !showed && setCurrentBlock('game')}>Игра</Button>
            </ButtonGroup>
            {currentBlock === 'game' && <GameTab/>}
            {currentBlock === 'team' && <ScoresTab/>}
            <RoundTimer/>
            <AlarmTimer onTimerEnd={onRoundFinished}/>
        </Stack>
    )
}

export default GamePage;
