import {useSelector} from "react-redux";
import ResetFullGame from "../components/ResetFullGame";

const WelcomePage = () => {

  const {score} = useSelector(state => state.game);

  return (
      <div className="App">
        {Object.entries(score).map(([team, score]) => (
            <p key={Math.random()}>{team}: {score}</p>
        ))}
        <ResetFullGame/>
      </div>
  )
}

export default WelcomePage;