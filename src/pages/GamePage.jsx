import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import AlarmTimer from "../components/AlarmTimer";
import RoundTimer from "../components/RoundTimer";
import {random} from "../util/arrayUtils";
import OpenWordButton from "../components/OpenWordButton";
import {ButtonGroup, Container} from "@mui/material";
import GuessedWordsModal from "../components/GuessedWordsModal";
import {setRoundAnsweredWords, setRoundEnded, setRoundWords, setTimerRunning} from "../redux/gameSlice";
import GameHeader from "../components/GameHeader";
import ScoresBlock from "../components/ScoresBlock";
import Button from "@mui/material/Button";

const GamePage = () => {
    const {
        leftWords: tourLeftWords,
        leftSeconds,
        timerRunning,
        roundEnded,
        roundWords,
        roundAnsweredWords
    } = useSelector(state => state.game);
    const dispatch = useDispatch();
    const [showed, setShowed] = useState(false)
    const [currentWord, setCurrentWord] = useState('')
    const [currentBlock, setCurrentBlock] = useState('game')

    useEffect(() => {
    }, [leftSeconds, currentBlock]);


    const startTimer = () => {
        if (!timerRunning) {
            dispatch(setTimerRunning(true));
        }
    };

    const onRoundFinished = () => {
        dispatch(setTimerRunning(false));
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
            dispatch(setTimerRunning(false));
            dispatch(setRoundEnded(true));
            setShowed(false);
            alert('Слова в кепке закончились');
        }
    }
    const activeTabStyles = {
        backgroundColor: "#F0F0F0",
        fontSize: '16px',
        color: "#6B6B6B",
        fontWeight: '600',
        borderColor: '#D1D1D1',
        borderRadius: '100px'
    }
    const inactiveTabStyles = {
        backgroundColor: "#000000",
        fontSize: '16px',
        color: "#FFFFFF",
        fontWeight: '600',
        borderColor: '#D1D1D1',
        borderRadius: '100px'
    };

    return (
        <Stack spacing={2}>
            <GameHeader/>
            <ButtonGroup sx={{height: '58px', opacity: showed ? '40%' : '100%'}} fullWidth>
                <Button sx={currentBlock === 'game' ? activeTabStyles : inactiveTabStyles}
                        onClick={() => !showed && setCurrentBlock('team')}>Команда</Button>
                <Button sx={currentBlock === 'team' ? activeTabStyles : inactiveTabStyles}
                        onClick={() => !showed && setCurrentBlock('game')}>Игра</Button>
            </ButtonGroup>
            {currentBlock === 'game' &&
                <>
                    <Container sx={{display: 'flex', justifyContent: 'center', padding: 0}}>
                        <OpenWordButton disabled={roundEnded} onClick={openWord}>
                            {showed ? currentWord : 'Начать игру'}
                        </OpenWordButton>
                    </Container>
                    <GuessedWordsModal
                        setCurrentWord={setCurrentWord}
                    />
                </>
            }
            {currentBlock === 'team' && <ScoresBlock/>}
            <RoundTimer/>
            <AlarmTimer onTimerEnd={onRoundFinished}/>
        </Stack>
    )
}

export default GamePage;
