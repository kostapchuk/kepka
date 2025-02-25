import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
  setCurrentTeam, setElapsedTime,
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
import Footer from "../components/Footer";
import AlarmTimer from "../components/AlarmTimer";
import RoundTimer from "../components/RoundTimer";
import {distinct, random, shuffle} from "../util/arrayUtils";
import GuessedWordsOptions from "../components/GuessedWordsOptions";
// save all state to session so no lose on refresh
const GamePage = () => {

  const dispatch = useDispatch()
  const {
    leftWords: tourLeftWords,
    tour,
    leftSeconds,
    words,
    currentTeam,
    currentGameId,
    score,
    elapsedTime,
    timer: roundDuration
  } = useSelector(state => state.game);
  const [showed, setShowed] = useState(false)
  const [currentWord, setCurrentWord] = useState('')

  const [roundWords, setRoundWords] = useState([]);
  const [roundAnsweredWords, setRoundAnsweredWords] = useState([]);

  const [roundEnded, setRoundEnded] = useState(false)
  const players = useSelector(state => state.players);
  const [currentAsker, setCurrentAsker] = useState(players.filter(
      p => p.gameId === currentGameId && p.teamId === currentTeam
          && p.asker)[0])
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    // dispatch(setElapsedTime(0));
  }, [leftSeconds]);

  const [alarmTimerRunning, setAlarmTimerRunning] = useState(false);

  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      setAlarmTimerRunning(true);
    }
  };

  const onRoundFinished = () => {
    setAlarmTimerRunning(false);
    setIsTimerRunning(false);
    setRoundEnded(true);
    setShowed(false);
  }

  const openWord = () => {
    if (!showed) {
      setShowed(true);
    }
    if (currentWord) {
      setRoundAnsweredWords(prevWords => [...prevWords, currentWord]);
    } else {
      startTimer();
    }
    if (roundWords.length < tourLeftWords.length) {
      const word = random(tourLeftWords.filter(item => !roundWords.includes(item)));
      setCurrentWord(word);
      setRoundWords(prevWords => [...prevWords, word]);
    } else {
      setAlarmTimerRunning(false);
      setIsTimerRunning(false);
      setRoundEnded(true);
      setShowed(false);
      alert('Слова в кепке закончились');
    }
  }

  const finishRound = () => {
    setRoundEnded(false)
    const actualLeftWords = tourLeftWords.filter(item => !roundAnsweredWords.includes(item))
    dispatch(setLeftWords(shuffle(actualLeftWords)))
    let continueNow = false
    const leftTime = leftSeconds[currentTeam] - elapsedTime
    const continueNowTime = Number((tour === 'Крокодил' ? Math.round(leftTime / 2) : leftTime))
    const continueLaterTime = continueNowTime + Number(roundDuration)
    if (actualLeftWords.length === 0 && tour !== 'Одно слово' && leftTime >= 1) {
      continueNow = window.confirm(`У вас осталось ${continueNowTime} секунд. Продолжите первыми с этим остатком в следующем туре?`);
      const newLeftSeconds = {
        ...leftSeconds,
        [currentTeam]: continueNow ? continueNowTime : continueLaterTime,
      }
      dispatch(setLeftSeconds(newLeftSeconds));
    } else {
      const newLeftSeconds = {
        ...leftSeconds,
        [currentTeam]: roundDuration,
      }
      dispatch(setLeftSeconds(newLeftSeconds))
    }
    dispatch(setElapsedTime(0));
    const newScore = {
      ...score,
      [currentTeam]: (score[currentTeam] || 0) + roundAnsweredWords.length,
    }
    dispatch(setScore(newScore))
    setRoundWords([]);
    setRoundAnsweredWords([]);
    setCurrentWord('')
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
      const teamNames = distinct(players.filter(p => p.gameId === currentGameId).map(p => p.teamId))
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
      dispatch(setLeftWords(shuffle(words)))
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

  return (
      <Stack spacing={2}>
        <RoundTimer running={isTimerRunning}/>
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
        <p>Осталось слов в кепке: {tourLeftWords.length}</p>
        {roundEnded && <h4>Отгаданные слова:</h4>}
        {roundEnded && <GuessedWordsOptions roundWords={roundWords} roundAnsweredWords={roundAnsweredWords} setRoundAnsweredWords={setRoundAnsweredWords}/>}
        {roundEnded && <Button size="large" onClick={finishRound} variant="contained">Закончить раунд</Button>}
        <AlarmTimer running={alarmTimerRunning} onTimerEnd={onRoundFinished}/>
        <Footer/>
      </Stack>
  )
}

export default GamePage;
