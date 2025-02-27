import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Footer from "../components/Footer";
import AlarmTimer from "../components/AlarmTimer";
import RoundTimer from "../components/RoundTimer";
import {random} from "../util/arrayUtils";
import OpenWordButton from "../components/OpenWordButton";
import {Container} from "@mui/material";
import GuessedWordsModal from "../components/GuessedWordsModal";
import {setRoundAnsweredWords, setRoundEnded, setRoundWords} from "../redux/gameSlice";

const GamePage = () => {
    const {
        leftWords: tourLeftWords,
        tour,
        leftSeconds,
        currentTeam,
        currentGameId,
        score,
        roundEnded,
        roundWords,
        roundAnsweredWords
    } = useSelector(state => state.game);
    const dispatch = useDispatch();
    const [showed, setShowed] = useState(false)
    const [currentWord, setCurrentWord] = useState('')

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
        dispatch(setRoundEnded(true));
        setShowed(false);
    }

    const openWord = () => {
        if (!showed) {
            setShowed(true);
        }
        if (currentWord) {
            dispatch(setRoundAnsweredWords([...roundAnsweredWords, currentWord]));
        } else {
            startTimer();
        }
        if (roundWords.length < tourLeftWords.length) {
            const word = random(tourLeftWords.filter(item => !roundWords.includes(item)));
            setCurrentWord(word);
            dispatch(setRoundWords([...roundWords, word]));
        } else {
            setAlarmTimerRunning(false);
            setIsTimerRunning(false);
            dispatch(setRoundEnded(true));
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
            <GuessedWordsModal
                setCurrentWord={setCurrentWord}
                setCurrentAsker={setCurrentAsker}
            />
            <AlarmTimer running={alarmTimerRunning} onTimerEnd={onRoundFinished}/>
            <Footer/>
        </Stack>
    )
}

export default GamePage;
