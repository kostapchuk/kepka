import React from "react";
import Container from "@mui/material/Container";

import AlarmTimer from "../components/game/AlarmTimer";
import RoundTimer from "../components/game/RoundTimer";
import GameHeader from "../components/game/GameHeader";
import TourChangeModal from "../components/tourchange/TourChangeModal";
import GameAndScoresTabs from "../components/shared/GameAndScoresTabs";
import ScrollablePageWithStickyFooter
      from "../components/shared/ScrollablePageWithStickyFooter";

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
