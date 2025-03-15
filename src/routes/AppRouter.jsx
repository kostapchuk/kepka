import {useSelector} from "react-redux";
import {Pages} from "./index";
import TeamSetupPage from "../pages/TeamSetupPage";
import WordsSetupPage from "../pages/WordsSetupPage";
import GamePage from "../pages/GamePage";
import ResultsPage from "../pages/ResultsPage";
import Container from "@mui/material/Container";
import TourSetupPage from "../pages/TourSetupPage";
import GuessedWordsPage from "../pages/GuessedWordsPage";
import RestartGameModal from "../components/RestartGameModal";
import React from 'react';

const AppRouter = () => {

    const currentPage = useSelector(state => state.page.currentPage);

    return (
        <Container sx={{mt: 2}} maxWidth>
            {currentPage === Pages.TEAM_SETUP_PAGE && <TeamSetupPage/>}
            {currentPage === Pages.WORDS_SETUP_PAGE && <WordsSetupPage/>}
            {currentPage === Pages.TOUR_SETUP_PAGE && <TourSetupPage/>}
            {currentPage === Pages.GAME_PAGE && <GamePage/>}
            {currentPage === Pages.RESULTS_PAGE && <ResultsPage/>}
            {currentPage === Pages.ROUND_SCORE_PAGE && <GuessedWordsPage/>}
            <RestartGameModal/>
        </Container>
    );
};

export default AppRouter;
