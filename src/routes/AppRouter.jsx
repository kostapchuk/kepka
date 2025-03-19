import {useSelector} from "react-redux";
import React from 'react';
import {Pages} from "./index";

import TeamSetupPage from "../pages/TeamSetupPage";
import WordsSetupPage from "../pages/WordsSetupPage";
import ResultsPage from "../pages/ResultsPage";
import TourSetupPage from "../pages/TourSetupPage";
import RestartGameModal from "../components/RestartGameModal";
import GamePage from "../pages/GamePage";
import GuessedWordsPage from "../pages/GuessedWordsPage";
import RandomizerModal from "../components/RandomizerModal";
import LanguageChangeModal from "../components/LanguageChangeModal";

const AppRouter = () => {

    const currentPage = useSelector(state => state.page.currentPage);

    return (
        <>
            {currentPage === Pages.TEAM_SETUP_PAGE && <TeamSetupPage/>}
            {currentPage === Pages.TOUR_SETUP_PAGE && <TourSetupPage/>}
            {currentPage === Pages.WORDS_SETUP_PAGE && <WordsSetupPage/>}
            {currentPage === Pages.RESULTS_PAGE && <ResultsPage/>}
            {currentPage === Pages.GAME_PAGE && <GamePage/>}
            {currentPage === Pages.ROUND_SCORE_PAGE && <GuessedWordsPage/>}
            <RestartGameModal/>
            <RandomizerModal/>
            <LanguageChangeModal/>
        </>
    );
};

export default AppRouter;
