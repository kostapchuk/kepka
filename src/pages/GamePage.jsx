import React from "react";
import Container from "@mui/material/Container";

import AlarmTimer from "../components/AlarmTimer";
import RoundTimer from "../components/RoundTimer";
import GameHeader from "../components/GameHeader";
import ConfirmationTourChangeModal from "../components/TourChangeModal";
import GameAndScoresTabs from "../components/GameAndScoresTabs";

const GamePage = () => {
    return (
        <Container sx={{mt: 2}} maxWidth="xs">
            <GameHeader/>
            <GameAndScoresTabs/>
            <ConfirmationTourChangeModal/>
            <RoundTimer/>
            <AlarmTimer/>
        </Container>
    );
};
export default GamePage;
