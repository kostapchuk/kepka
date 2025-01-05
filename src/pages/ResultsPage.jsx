import {useSelector} from "react-redux";
import Footer from "../components/Footer";

const WelcomePage = () => {

  const {score} = useSelector(state => state.game);

  return (
      <div className="App">
        {Object.entries(score).map(([team, score]) => (
            <p key={Math.random()}>{team}: {score}</p>
        ))}
        <Footer/>
      </div>
  )
}

export default WelcomePage;