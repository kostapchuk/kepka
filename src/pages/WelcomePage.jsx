import {useDispatch} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import Button from '@mui/material/Button';
import Footer from "../components/Footer";
import Stack from "@mui/material/Stack";

const WelcomePage = () => {

  const dispatch = useDispatch();

  const handleStartGame = () => {
    dispatch(setCurrentPage(Pages.TEAM_SETUP_PAGE))
  }

  return (
      <Stack spacing={6}>
        <h3>
          Приветствуем в игре Кепка!
        </h3>
        <Button size="large" onClick={handleStartGame} variant="contained">
          Начать
        </Button>
        <Footer/>
      </Stack>
  )
}

export default WelcomePage;
