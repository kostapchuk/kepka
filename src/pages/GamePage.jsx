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
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {Checkbox, FormControlLabel, Typography} from "@mui/material";
import Footer from "../components/Footer";
import AlarmTimer from "../components/AlarmTimer";

// save all state to session so no lose on refresh
const GamePage = () => {

  const dispatch = useDispatch()
  const {
    leftWords,
    tour,
    leftSeconds,
    words,
    currentTeam,
    currentGameId,
    score,
    timer: roundDuration
  } = useSelector(state => state.game);
  const [index, setIndex] = useState(0)
  const [showed, setShowed] = useState(false)
  const [currentWord, setCurrentWord] = useState('')
  const [answeredWords, setAnsweredWords] = useState([])
  const [copyAnsweredWords, setCopyAnsweredWords] = useState([])

  const [roundEnded, setRoundEnded] = useState(false)
  const players = useSelector(state => state.players);
  const [currentAsker, setCurrentAsker] = useState(players.filter(
      p => p.gameId === currentGameId && p.teamId === currentTeam
          && p.asker)[0])
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [concreteRoundDuration, setConcreteRoundDuration] = useState(
      Number(roundDuration) + Number((leftSeconds[currentTeam] || 0))
  )

  const [alarmTimerRunning, setAlarmTimerRunning] = useState(false);

  useEffect(() => {
    let timer
    if (isTimerRunning) {
       timer = setInterval(() => {
        setElapsedTime(prev => {
          if (prev <= concreteRoundDuration - 1) {
            return prev + 1;
          } else {
            clearInterval(timer);
            return prev;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, elapsedTime]);

  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      setAlarmTimerRunning(true);
    }
    const newLeftSeconds = {
      ...leftSeconds,
      [currentTeam]: 0,
    }
    dispatch(setLeftSeconds(newLeftSeconds))
  };

  const onAlarmTimerEnd = () => {
    setAlarmTimerRunning(false);
    setRoundEnded(true);
    setIsTimerRunning(false);
    setTimerId(null);
    setShowed(false);
    setAnsweredWords(prevWords => [...prevWords, currentWord]);
    setCopyAnsweredWords([...answeredWords, currentWord])
  }

  const cancelTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      console.log('Timer canceled. Seconds left:',
          concreteRoundDuration - elapsedTime);
      setTimerId(null);
      setElapsedTime(0);
      setIsTimerRunning(false);
    }
  };

  const openWord = () => {
    if (!showed) {
      setShowed(true);
    }
    if (!currentWord) {
      startTimer();
    }
    if (index < leftWords.length) {
      if (currentWord) {
        setAnsweredWords(prevWords => [...prevWords, currentWord]);
      }
      const word = leftWords[index];
      setIndex(index + 1);
      setCurrentWord(word);
    } else {
      cancelTimer();
      setIndex(0);
      setRoundEnded(true);
      setShowed(false);
      alert('Слова в кепке закончились');
    }
  }

  const finishRound = () => {
    setRoundEnded(false)
    const actualLeftWords = leftWords.filter(
        word => !answeredWords.includes(word))
    dispatch(setLeftWords(actualLeftWords.sort(() => 0.5 - Math.random())))
    let continueNow = false
    const leftTime = concreteRoundDuration - elapsedTime
    if (actualLeftWords.length === 0 && tour !== 'Одно слово' && leftTime
        >= 1) {
      const newLeftSeconds = {
        ...leftSeconds,
        [currentTeam]: tour === 'Крокодил' ? Math.round(leftTime / 2)
            : leftTime,
      }
      dispatch(setLeftSeconds(newLeftSeconds));
      const input = prompt("Продолжить первыми в следующем туре с остатком в "
          + leftTime + " секунд?")
      if (input) {
        continueNow = true
      }
    }
    setElapsedTime(0);
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
          p => p.gameId === currentGameId && p.teamId === newTeam
              && p.asker)[0])
    }
    if (actualLeftWords.length === 0) {
      dispatch(setLeftWords(words))
      if (tour === 'Алиас') {
        dispatch(setTour('Крокодил'));
        alert('Следующий тур - крокодил')
      } else if (tour === 'Крокодил') {
        dispatch(setTour('Одно слово'));
        alert('Cледующий тур - одно слово')
      } else if (tour === 'Одно слово') {
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
      <Stack spacing={2}>
        <p>Осталось времени: {roundDuration - elapsedTime}</p>
        <p>Название тура: {tour}</p>
        <p>Команда: {currentTeam}</p>
        <p>Загадыватель: {currentAsker.name}</p>
        <Button size="large" variant="contained" sx={{
          padding: '20px 45px',
          fontSize: '25px',
          borderRadius: '5px'
        }} onClick={openWord} disabled={roundEnded}>
          {showed ? currentWord : 'Начать'}
        </Button>
        <p>Баллы твоей команды: {score[currentTeam] || 0}</p>
        <p>Осталось слов в кепке: {leftWords.length}</p>
        {roundEnded && <h4>Отгаданные слова:</h4>}
        {roundEnded && copyAnsweredWords.map(option => (
            <FormControlLabel key={Math.random()} control={<Checkbox
                key={Math.random()}
                checked={answeredWords.includes(option)}
                onChange={() => {
                  if (answeredWords.includes(option)) {
                    setAnsweredWords(prevWords => prevWords.filter(
                        word => word !== option));
                  } else {
                    setAnsweredWords(prevWords => [...prevWords, option]);
                  }
                }}
                sx={{
                  '&.Mui-checked': {
                    transform: 'scale(1.5)',
                  },
                  transform: 'scale(1.5)',
                  padding: '10px',
                }}
            />} label={
              <Typography variant="body1" style={{fontSize: '25px'}}>
                {option}
              </Typography>
            }/>

        ))}
        {roundEnded && <Button onClick={finishRound} variant="contained">Закончить
          раунд</Button>}
        <AlarmTimer running={alarmTimerRunning} onTimerEnd={onAlarmTimerEnd}/>
        <Footer/>
      </Stack>
  )
}

export default GamePage;