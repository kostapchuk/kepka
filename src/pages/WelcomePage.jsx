import {useDispatch} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import ResetFullGame from "../components/ResetFullGame";

const WelcomePage = () => {

  const dispatch = useDispatch();

  const handleStartGame = () => {
    dispatch(setCurrentPage(Pages.TEAM_SETUP_PAGE))
  }

  return (
      <div className="App">
        <p>
          Приветствуем в игре Кепка!
        </p>
        <button onClick={handleStartGame}>
          Начать
        </button>
        <ResetFullGame/>
      </div>
  )
}

export default WelcomePage;