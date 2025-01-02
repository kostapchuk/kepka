import {useDispatch} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import ResetFullGame from "../components/ResetFullGame";
import Button from '@mui/material/Button';

const WelcomePage = () => {

  const dispatch = useDispatch();

  const handleStartGame = () => {
    dispatch(setCurrentPage(Pages.TEAM_SETUP_PAGE))
  }

  return (
      <div className="App">
        <h3>
          Приветствуем в игре Кепка!
        </h3>
        <Button onClick={handleStartGame} variant="contained">
          Начать
        </Button>
        <ResetFullGame/>
      </div>
  )
}

export default WelcomePage;