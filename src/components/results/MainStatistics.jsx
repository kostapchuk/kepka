import {Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {
  findEasiestAndHardestWords
} from "../../util/findEasiestAndHardestWords";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const MainStatistics = () => {

  const [gameStats, setGameStats] = useState({});
  const {wordStats} = useSelector(state => state.statistics);
  const {t} = useTranslation();

  useEffect(() => {
    setGameStats(findEasiestAndHardestWords(wordStats));
  }, [wordStats]);

  return (
      <>
        <Typography>
          📍{t('statistics-general-easiest-word', {
          word: gameStats?.easiest?.word,
          duration: gameStats?.easiest?.duration
        })}
        </Typography>

        <Typography>
          ✍️{t('statistics-general-hardest-word', {
          word: gameStats?.hardest?.word,
          duration: gameStats?.hardest?.duration
        })}
        </Typography>
      </>
  );
}

export default MainStatistics