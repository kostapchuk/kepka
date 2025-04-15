import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import {useSelector} from "react-redux";
import useTranslationAndDispatch from "../../hooks/useTranslationAndDispatch";
import {
  addRoundWordStats, setLastClick,
  updateRoundWordStatsDuration
} from "../../redux/statisticsSlice";
import {
  setCurrentWord,
  setRoundAnsweredWords,
  setRoundInProgress, setRoundWords,
  setTimerRunning
} from "../../redux/gameSlice";
import {random} from "../../util/arrayUtils";
import {setCurrentPage} from "../../redux/pageSlice";
import {Pages} from "../../routes";

const StyledButton = styled(Button)({
  minHeight: '36vh',
  width: '100%',
  backgroundColor: '#7A51EC',
  color: '#FFFFFF',
  fontSize: '30px',
  borderRadius: '20px',
  touchAction: 'manipulation',
  ":disabled": {color: '#FFFFFF'}
});

const OpenWordButton = () => {

  const {
    leftWords: tourLeftWords,
    timerRunning,
    roundWords,
    roundAnsweredWords,
    currentWord,
    showLeftWords,
    roundInProgress,
    tour,
    currentTeam,
    currentGameId
  } = useSelector(state => state.game);

  const {lastClick} = useSelector(state => state.statistics);

  const players = useSelector(state => state.players);

  const {dispatch, t} = useTranslationAndDispatch();

  const startTimer = () => {
    if (!timerRunning) {
      dispatch(setTimerRunning(true));
    }
  };

  const openWord = () => {
    const currentTime = performance.now();
    if (!roundInProgress) {
      dispatch(setRoundInProgress(true));
    }
    if (currentWord) {
      dispatch(setRoundAnsweredWords([...roundAnsweredWords, currentWord]));
    } else {
      startTimer();
    }
    if (roundWords.length < tourLeftWords.length) {
      const word = random(
          tourLeftWords.filter(item => !roundWords.includes(item)));
      if (lastClick) {
        const timeDifference = currentTime - lastClick;
        const currentWordStats = {
          word: currentWord,
          tour: tour,
          player: players.filter(
              p => p.gameId === currentGameId && p.teamId === currentTeam
                  && p.asker)[0].name,
          duration: timeDifference.toFixed(1),
          team: currentTeam
        }
        dispatch(updateRoundWordStatsDuration(currentWordStats));
      }
      const wordStatsNew = {
        word: word,
        tour: tour,
        player: players.filter(
            p => p.gameId === currentGameId && p.teamId === currentTeam
                && p.asker)[0].name,
        duration: null,
        team: currentTeam
      }
      dispatch(addRoundWordStats(wordStatsNew));
      dispatch(setCurrentWord(word));
      dispatch(setRoundWords([...roundWords, word]));
      dispatch(setLastClick(currentTime));
    } else {
      const timeDifference = currentTime - lastClick;
      const currentWordStats = {
        word: currentWord,
        tour: tour,
        player: players.filter(
            p => p.gameId === currentGameId && p.teamId === currentTeam
                && p.asker)[0].name,
        duration: timeDifference.toFixed(1),
        team: currentTeam
      }
      dispatch(updateRoundWordStatsDuration(currentWordStats));
      dispatch(setTimerRunning(false));
      dispatch(setCurrentPage(Pages.ROUND_SCORE_PAGE))
      dispatch(setRoundInProgress(false));
      dispatch(setLastClick(null));
    }
  }

  return (
      <StyledButton onClick={openWord}>
        <Box>
          {roundInProgress
              ? <Typography variant="h2"
                            sx={{fontWeight: '600', fontSize: '30px'}}>
                {currentWord}
              </Typography>
              : <>
                <Typography variant="h2"
                            sx={{fontWeight: '600', fontSize: '30px'}}>
                  {t('start-game')}
                </Typography>
                {showLeftWords &&
                    <Typography sx={{
                      fontSize: '14px',
                      display: 'block',
                      opacity: '60%'
                    }}>
                      {t('left-words')}: {tourLeftWords.length}
                    </Typography>}
              </>}
        </Box>
      </StyledButton>
  )
}

export default OpenWordButton;