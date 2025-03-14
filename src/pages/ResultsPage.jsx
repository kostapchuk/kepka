import {useSelector} from "react-redux";

const ResultsPage = () => {

  const {score} = useSelector(state => state.game);

  return (
      <div className="App">
        {Object.entries(score).map(([team, score]) => (
            <p key={Math.random()}>{team}: {score}</p>
        ))}
      </div>
  )
}

export default ResultsPage;
