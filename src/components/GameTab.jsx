import {Box, Container, Typography} from "@mui/material";
import OpenWordButton from "./OpenWordButton";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentWord, setRoundAnsweredWords, setRoundWords, setTimerRunning} from "../redux/gameSlice";
import {random} from "../util/arrayUtils";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";

const GameTab = ({showed, setShowed}) => {

    const {
        leftWords: tourLeftWords,
        timerRunning,
        roundWords,
        roundAnsweredWords,
        currentWord,
        showLeftWords
    } = useSelector(state => state.game);
    const dispatch = useDispatch();

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
            dispatch(setCurrentWord(word));
            dispatch(setRoundWords([...roundWords, word]));
        } else {
            dispatch(setTimerRunning(false));
            dispatch(setCurrentPage(Pages.ROUND_SCORE_PAGE))
            setShowed(false);
        }
    }

    return (
        <Container sx={{display: 'flex', justifyContent: 'center', padding: 0}}>
            <OpenWordButton onClick={openWord}>
                <Box>
                    {showed
                        ? <Typography variant="h2" sx={{fontWeight: '600', fontSize: '30px'}}>
                            {currentWord}
                        </Typography>
                        : <>
                            <Typography variant="h2" sx={{fontWeight: '600', fontSize: '30px'}}>
                                Начать игру
                            </Typography>
                            {showLeftWords &&
                                <Typography sx={{fontSize: '14px', display: 'block', opacity: '60%'}}>
                                    Осталось слов: {tourLeftWords.length}
                                </Typography>}
                        </>}
                </Box>
            </OpenWordButton>
        </Container>
    )
}

export default GameTab
