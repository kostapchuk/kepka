import {useSelector} from "react-redux";
import {Pages} from "./index";
import WelcomePage from "../pages/WelcomePage";
import TeamSetupPage from "../pages/TeamSetupPage";
import GameSetupPage from "../pages/GameSetupPage";
import GamePage from "../pages/GamePage";
import ResultsPage from "../pages/ResultsPage";
import {Container} from "@mui/material";

const AppRouter = () => {

    const currentPage = useSelector(state => state.page.currentPage);

    return (
        <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {currentPage === Pages.WELCOME_PAGE && <WelcomePage/>}
            {currentPage === Pages.TEAM_SETUP_PAGE && <TeamSetupPage/>}
            {currentPage === Pages.GAME_SETUP_PAGE && <GameSetupPage/>}
            {currentPage === Pages.GAME_PAGE && <GamePage/>}
            {currentPage === Pages.RESULTS_PAGE && <ResultsPage/>}
        </Container>
    );
};

export default AppRouter;
