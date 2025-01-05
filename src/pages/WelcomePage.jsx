import {useDispatch} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import Button from '@mui/material/Button';
import Footer from "../components/Footer";

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
        <Button size="large" onClick={handleStartGame} variant="contained">
          Начать
        </Button>
        <Footer/>
      </div>
  )
}

export default WelcomePage;