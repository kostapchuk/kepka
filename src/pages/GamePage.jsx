import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
  setCurrentTeam,
  setLeftSeconds,
  setLeftWords,
  setScore,
  setTour
} from "../redux/gameSlice";
import {updatePlayer} from "../redux/playersSlice";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import ResetFullGame from "../components/ResetFullGame";

const GamePage = () => {

  const dispatch = useDispatch()
  const {
    leftWords,
    tour,
    leftSeconds,
    words,
    currentTeam,
    currentGameId,
    score
  } = useSelector(state => state.game);
  const [index, setIndex] = useState(0)
  const [showed, setShowed] = useState(false)
  const [currentWord, setCurrentWord] = useState('')
  const [answeredWords, setAnsweredWords] = useState([])
  const [copyAnsweredWords, setCopyAnsweredWords] = useState([])

  const [roundEnded, setRoundEnded] = useState(false)
  const [timeLeft, setTimeLeft] = useState(-1);
  const [isActive, setIsActive] = useState(false);
  const players = useSelector(state => state.players);
  const [currentAsker, setCurrentAsker] = useState(players.filter(
      p => p.gameId === currentGameId && p.teamId === currentTeam
          && p.asker)[0])
  const [manuallyStopped, setManuallyStopped] = useState(false)

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1); // Decrement time left
      }, 1000); // Update every second
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setRoundEnded(true)
      setShowed(false)
      setAnsweredWords(prevWords => [...prevWords, currentWord]);
      setCopyAnsweredWords([...answeredWords, currentWord])
      if (!manuallyStopped) {
        alert('Time is over');
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setIsActive(true);
    setTimeLeft(30 + (leftSeconds[currentTeam] || 0))
    const newLeftSeconds = {
      ...leftSeconds,
      [currentTeam]: 0,
    }
    dispatch(setLeftSeconds(newLeftSeconds))
  };

  const openWord = () => {
    if (!showed) {
      setShowed(true);
    }
    if (!isActive) {
      startTimer()
    }
    if (index < leftWords.length) {
      if (currentWord) {
        setAnsweredWords(prevWords => [...prevWords, currentWord]);
      }
      const word = leftWords[index];
      setIndex(index + 1);
      setCurrentWord(word);
    } else {
      const newLeftSeconds = {
        ...leftSeconds,
        [currentTeam]: timeLeft,
      }
      dispatch(setLeftSeconds(newLeftSeconds))
      setTimeLeft(0);
      setManuallyStopped(true)
      setIndex(0);
      setRoundEnded(true);
      setShowed(false);
      alert('all words are answered');
    }
  }

  const finishRound = () => {
    setRoundEnded(false)
    const actualLeftWords = leftWords.filter(word => !answeredWords.includes(word))
    dispatch(setLeftWords(actualLeftWords.sort(() => 0.5 - Math.random())))
    let continueNow = false
    if (actualLeftWords.length === 0 && tour !== 'One word') {
      const input = prompt("Продолжить первыми в следующем туре с остатком в " + leftSeconds[currentTeam] + " секунд?")
      if (input) {
        continueNow = true
      }
    }
    const newScore = {
      ...score,
      [currentTeam]: (score[currentTeam] || 0) + answeredWords.length,
    }
    dispatch(setScore(newScore))
    setAnsweredWords([]);
    setCopyAnsweredWords([])
    setCurrentWord('')
    setIndex(0)
    // rotate asker in current team
    if (!continueNow) {
      const currentTeamPlayers = players.filter(
          p => p.gameId === currentGameId && p.teamId === currentTeam)
      const currentAskerIdx = currentTeamPlayers.indexOf(currentAsker)
      let newAskerIdx
      if (currentAskerIdx === currentTeamPlayers.length - 1) {
        newAskerIdx = 0
      } else {
        newAskerIdx = currentAskerIdx + 1
      }
      const newAsker = currentTeamPlayers[newAskerIdx]
      const generalCurrentAskerIndex = players.indexOf(currentAsker)
      const generalNewAskerIndex = players.indexOf(newAsker)
      dispatch(updatePlayer({
        index: generalCurrentAskerIndex,
        updatedInfo: {...currentAsker, asker: 0}
      }))
      dispatch(updatePlayer(
          {index: generalNewAskerIndex, updatedInfo: {...newAsker, asker: 1}}))

      // rotate team
      const teamNames = removeDuplicates(
          players.filter(p => p.gameId === currentGameId).map(p => p.teamId))
      const currentTeamIndex = teamNames.indexOf(currentTeam)
      let newTeam
      if (currentTeamIndex === teamNames.length - 1) {
        newTeam = teamNames[0]
        dispatch(setCurrentTeam(newTeam))
      } else {
        newTeam = teamNames[currentTeamIndex + 1]
        dispatch(setCurrentTeam(newTeam))
      }
      setCurrentAsker(players.filter(
          p => p.gameId === currentGameId && p.teamId === newTeam && p.asker)[0])
    }
    if (actualLeftWords.length === 0) {
      dispatch(setLeftWords(words))
      if (tour === 'Alias') {
        dispatch(setTour('Crocodile'));
        alert('CROCODILE')
      } else if (tour === 'Crocodile') {
        dispatch(setTour('One word'));
        alert('One word')
      } else if (tour === 'One word') {
        dispatch(setCurrentPage(Pages.RESULTS_PAGE));
      }
    }
  }

  function removeDuplicates(array) {
    return array.reduce((accumulator, current) => {
      if (!accumulator.includes(current)) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
  }

  return (
      <div className="App">
        <p>Название тура: {tour}</p>
        <p>Команда: {currentTeam}</p>
        <p>Загадыватель: {currentAsker.name}</p>
        <button style={{
          padding: '20px 45px',
          fontSize: '25px',
          borderRadius: '5px'
        }} onClick={openWord}>
          {showed ? currentWord : 'Начать'}
        </button>
        <p>Баллы твоей команды: {score[currentTeam] || 0}</p>
        <p>Осталось слов в кепке: {leftWords.length}</p>
        {roundEnded && <h4>Отгаданные слова:</h4>}
        {roundEnded && copyAnsweredWords.map(option => (
            <div key={Math.random()}>
              <label>
                <input
                    type="checkbox"
                    checked={answeredWords.includes(option)}
                    onChange={() => {
                      if (answeredWords.includes(option)) {
                        setAnsweredWords(prevWords => prevWords.filter(
                            word => word !== option));
                      } else {
                        setAnsweredWords(prevWords => [...prevWords, option]);
                      }
                    }}
                />
                {option}
              </label>
            </div>
        ))}
        {roundEnded && <button onClick={finishRound}>Закончить раунд</button>}
        <ResetFullGame/>
      </div>
  )
}

export default GamePage;