import {useDispatch} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";

const WelcomePage = () => {

  const dispatch = useDispatch();

  const handleStartGame = () => {
    dispatch(setCurrentPage(Pages.TEAM_SETUP_PAGE))
  }

  return (
      <div className="App">
        <p>
          Welcome to not a game just SHLYAPA
        </p>
        <button onClick={handleStartGame}>
          Start
        </button>
      </div>
  )
}

export default WelcomePage;