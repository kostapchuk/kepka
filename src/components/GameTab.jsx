import {Box, Container, Typography} from "@mui/material";
import OpenWordButton from "./OpenWordButton";
import GuessedWordsModal from "./GuessedWordsModal";
import {useDispatch, useSelector} from "react-redux";
import {setRoundAnsweredWords, setRoundEnded, setRoundWords, setTimerRunning} from "../redux/gameSlice";
import {random} from "../util/arrayUtils";
import {useState} from "react";

const GameTab = () => {

    const hideWordsLeft = false

    const {
        leftWords: tourLeftWords,
        timerRunning,
        roundEnded,
        roundWords,
        roundAnsweredWords
    } = useSelector(state => state.game);
    const dispatch = useDispatch();
    const [showed, setShowed] = useState(false)
    const [currentWord, setCurrentWord] = useState('')

    const startTimer = () => {
        if (!timerRunning) {
            dispatch(setTimerRunning(true));
        }
    };

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
            dispatch(setTimerRunning(false));
            dispatch(setRoundEnded(true));
            setShowed(false);
            alert('Слова в кепке закончились');
        }
    }

    return (
        <>
            <Container sx={{display: 'flex', justifyContent: 'center', padding: 0}}>
                <OpenWordButton disabled={roundEnded} onClick={openWord}>
                    <Box>
                        {showed
                            ? <Typography variant="h2" sx={{fontWeight: '600', fontSize: '30px'}}>
                                {currentWord}
                            </Typography>
                            : <>
                                <Typography variant="h2" sx={{fontWeight: '600', fontSize: '30px'}}>
                                    Начать игру
                                </Typography>
                                {!hideWordsLeft &&
                                    <Typography sx={{fontSize: '14px', display: 'block', opacity: '60%'}}>
                                        Осталось слов: {tourLeftWords.length}
                                    </Typography>}
                            </>}
                    </Box>
                </OpenWordButton>
            </Container>
            <GuessedWordsModal
                setCurrentWord={setCurrentWord}
            />
        </>
    )
}

export default GameTab
