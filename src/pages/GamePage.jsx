import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Footer from "../components/Footer";
import AlarmTimer from "../components/AlarmTimer";
import RoundTimer from "../components/RoundTimer";
import {random} from "../util/arrayUtils";
import GuessedWordsOptions from "../components/GuessedWordsOptions";
import FinishRoundButton from "../components/FinishRoundButton";
import OpenWordButton from "../components/OpenWordButton";
import {Container} from "@mui/material";

const GamePage = () => {
    const {
        leftWords: tourLeftWords,
        tour,
        leftSeconds,
        currentTeam,
        currentGameId,
        score,
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

    return (
        <Stack spacing={2}>
            <RoundTimer running={isTimerRunning}/>
            <p>Название тура: {tour}</p>
            <p>Команда: {currentTeam}</p>
            <p>Загадыватель: {currentAsker.name}</p>
            <Container sx={{display: 'flex', justifyContent: 'center', padding: 0}}>
                <OpenWordButton disabled={roundEnded} onClick={openWord}>
                    {showed ? currentWord : 'Начать игру'}
                </OpenWordButton>
            </Container>
            <p>Баллы твоей команды: {score[currentTeam] || 0}</p>
            <p>Осталось слов в кепке: {tourLeftWords.length}</p>
            {roundEnded && <GuessedWordsOptions
                roundWords={roundWords}
                roundAnsweredWords={roundAnsweredWords}
                setRoundAnsweredWords={setRoundAnsweredWords}
            />}
            {roundEnded && <FinishRoundButton
                setRoundEnded={setRoundEnded}
                roundAnsweredWords={roundAnsweredWords}
                setRoundWords={setRoundWords}
                setRoundAnsweredWords={setRoundAnsweredWords}
                setCurrentWord={setCurrentWord}
                setCurrentAsker={setCurrentAsker}
            />}
            <AlarmTimer running={alarmTimerRunning} onTimerEnd={onRoundFinished}/>
            <Footer/>
        </Stack>
    )
}

export default GamePage;
