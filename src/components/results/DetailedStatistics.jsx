import {Button, Collapse, Typography} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {findBestTeamPerTour} from "../../util/findBestTeamPerTour";
import {findBestPlayerPerTour} from "../../util/findBestPlayerPerTour";
import {
  findEasiestAndHardestWordsPerTour
} from "../../util/findEasiestAndHardestWordsPerTour";

const DetailedStatistics = () => {
  const {wordStats} = useSelector(state => state.statistics);
  const {t} = useTranslation();

  const [teamByTourStats, setTeamByTourStats] = useState({});
  const [playerByTourStats, setPlayerByTourStats] = useState({});
  const [wordByTourStats, setWordByTourStats] = useState({});
  const [showDetailedStats, setShowDetailedStats] = useState(false);

  const uniqueTours = useMemo(
      () => [...new Set(wordStats.map(stat => stat.tour))], [wordStats]);

  useEffect(() => {
    setTeamByTourStats(findBestTeamPerTour(wordStats));
    setPlayerByTourStats(findBestPlayerPerTour(wordStats));
    setWordByTourStats(findEasiestAndHardestWordsPerTour(wordStats));
  }, [wordStats]);

  return(
      <>
        <Button
            sx={{color: "#6B6B6B", backgroundColor: "#FFFFFF", mt: 2}}
            onClick={() => setShowDetailedStats(prev => !prev)}
        >
          {showDetailedStats ? t('hide-detailed-statistics') : t(
              'show-detailed-statistics')}
        </Button>

        <Collapse in={showDetailedStats} timeout="auto" unmountOnExit
                  sx={{mt: 2}}>
          {uniqueTours.map((tour, index) => (
              <React.Fragment key={`tour-${tour}-${index}`}>
                <Typography sx={{mt: 2}}>
                  {t('statistics-by-tour', {tour: t(tour.toLowerCase())})}
                </Typography>
                <Typography sx={{mt: 2}}>
                  💡{t('statistics-tour-best-team', {
                  team: teamByTourStats[tour]?.team,
                  wordCount: teamByTourStats[tour]?.wordCount
                })}
                </Typography>

                <Typography sx={{mt: 1}}>
                  👉{t('statistics-tour-best-team', {
                  player: playerByTourStats[tour]?.player,
                  team: playerByTourStats[tour]?.team,
                  wordCount: playerByTourStats[tour]?.wordCount
                })}
                </Typography>

                <Typography sx={{mt: 1}}>
                  📍{t('statistics-tour-easiest-word', {
                  word: wordByTourStats[tour]?.easiest?.word,
                  duration: wordByTourStats[tour]?.easiest?.duration,
                  team: wordByTourStats[tour]?.easiest?.team
                })}
                </Typography>

                <Typography sx={{mt: 1}}>
                  ✍️{t('statistics-tour-hardest-word', {
                  word: wordByTourStats[tour]?.hardest?.word,
                  duration: wordByTourStats[tour]?.hardest?.duration,
                  team: wordByTourStats[tour]?.hardest?.team
                })}
                </Typography>
              </React.Fragment>
          ))}
        </Collapse>
      </>
  )
}

export default DetailedStatistics;