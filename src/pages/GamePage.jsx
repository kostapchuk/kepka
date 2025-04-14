import React from "react";
import Container from "@mui/material/Container";

import AlarmTimer from "../components/AlarmTimer";
import RoundTimer from "../components/RoundTimer";
import GameHeader from "../components/GameHeader";
import TourChangeModal from "../components/TourChangeModal";
import GameAndScoresTabs from "../components/GameAndScoresTabs";
import ScrollablePageWithStickyFooter
      from "../components/ScrollablePageWithStickyFooter";

const GamePage = () => (
    <ScrollablePageWithStickyFooter>
      <GameHeader/>
      <GameAndScoresTabs/>
      <TourChangeModal/>
      <RoundTimer/>
      <AlarmTimer/>
    </ScrollablePageWithStickyFooter>
);
export default GamePage;
