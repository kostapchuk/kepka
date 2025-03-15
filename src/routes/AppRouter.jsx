import {useSelector} from "react-redux";
import Container from "@mui/material/Container";
import React from 'react';
import {Pages} from "./index";

import TeamSetupPage from "@/pages/TeamSetupPage";
import WordsSetupPage from "@/pages/WordsSetupPage";
import GamePage from "@/pages/GamePage";
import ResultsPage from "@/pages/ResultsPage";
import TourSetupPage from "@/pages/TourSetupPage";
import GuessedWordsPage from "@/pages/GuessedWordsPage";
import RestartGameModal from "@/components/RestartGameModal";


const AppRouter = () => {

    const currentPage = useSelector(state => state.page.currentPage);

    return (
        <>
            {currentPage === Pages.TEAM_SETUP_PAGE && <TeamSetupPage/>}
            <Container sx={{mt: 2}} maxWidth="xs">
                {currentPage === Pages.WORDS_SETUP_PAGE && <WordsSetupPage/>}
                {currentPage === Pages.TOUR_SETUP_PAGE && <TourSetupPage/>}
                {currentPage === Pages.GAME_PAGE && <GamePage/>}
                {currentPage === Pages.RESULTS_PAGE && <ResultsPage/>}
                {currentPage === Pages.ROUND_SCORE_PAGE && <GuessedWordsPage/>}
            </Container>
            <RestartGameModal/>
        </>
    );
};

export default AppRouter;
