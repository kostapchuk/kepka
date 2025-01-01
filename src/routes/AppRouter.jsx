import {useSelector} from "react-redux";
import {Pages} from "./index";
import WelcomePage from "../pages/WelcomePage";
import TeamSetupPage from "../pages/TeamSetupPage";
import GameSetupPage from "../pages/GameSetupPage";
import GamePage from "../pages/GamePage";

const AppRouter = () => {

  const currentPage = useSelector(state => state.page.currentPage);

  return (
      <>
        {currentPage === Pages.WELCOME_PAGE && <WelcomePage/>}
        {currentPage === Pages.TEAM_SETUP_PAGE && <TeamSetupPage/>}
        {currentPage === Pages.GAME_SETUP_PAGE && <GameSetupPage/>}
        {currentPage === Pages.GAME_PAGE && <GamePage/>}
      </>
  );
};

export default AppRouter;