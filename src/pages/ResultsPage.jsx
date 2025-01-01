import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";

const WelcomePage = () => {

  const {score} = useSelector(state => state.game);

  return (
      <div className="App">
        {Object.entries(score).map(([team, score]) => (
          <p key={Math.random()} >{team}: {score}</p>
        ))}
      </div>
  )
}

export default WelcomePage;