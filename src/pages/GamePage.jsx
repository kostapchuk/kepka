import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import AlarmTimer from "../components/AlarmTimer";
import RoundTimer from "../components/RoundTimer";
import ButtonGroup from "@mui/material/ButtonGroup";
import {setRoundInProgress, setTimerRunning, setTourChangeModalOpen} from "@/redux/gameSlice";
import GameHeader from "../components/GameHeader";
import ScoresTab from "../components/ScoresTab";
import Button from "@mui/material/Button";
import GameTab from "../components/GameTab";
import {setCurrentPage} from "@/redux/pageSlice";
import {Pages} from "@/routes";
import ConfirmationTourChangeModal from "../components/TourChangeModal";
import React from 'react';
import Container from "@mui/material/Container";

const GamePage = () => {
    const {leftSeconds, tourChangeModalOpen, roundInProgress} = useSelector(state => state.game);
    const dispatch = useDispatch();
    const [currentBlock, setCurrentBlock] = useState('game')

    useEffect(() => {
    }, [leftSeconds, currentBlock, tourChangeModalOpen]);

    const onRoundFinished = () => {
        dispatch(setTimerRunning(false));
        dispatch(setCurrentPage(Pages.ROUND_SCORE_PAGE))
        dispatch(setRoundInProgress(false));
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
        <Container sx={{mt: 2}} maxWidth="xs">
            <GameHeader/>
            <ButtonGroup sx={{height: '58px', opacity: roundInProgress ? '40%' : '100%'}} fullWidth>
                <Button sx={currentBlock === 'game' ? activeTabStyles : inactiveTabStyles}
                        onClick={() => !roundInProgress && setCurrentBlock('team')}>Команда</Button>
                <Button sx={currentBlock === 'team' ? activeTabStyles : inactiveTabStyles}
                        onClick={() => !roundInProgress && setCurrentBlock('game')}>Игра</Button>
            </ButtonGroup>
            {currentBlock === 'game' && <GameTab/>}
            {currentBlock === 'team' && <ScoresTab/>}
            <RoundTimer/>
            <ConfirmationTourChangeModal/>
            <AlarmTimer onTimerEnd={onRoundFinished}/>
        </Container>
    )
}

export default GamePage;
