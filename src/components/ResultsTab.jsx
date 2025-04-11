import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Box, Button, Collapse, Divider, Typography} from "@mui/material";

import {findEasiestAndHardestWords} from "../util/findEasiestAndHardestWords";
import {
  findEasiestAndHardestWordsPerTour
} from "../util/findEasiestAndHardestWordsPerTour";
import {findBestTeamPerTour} from "../util/findBestTeamPerTour";
import {findBestPlayerPerTour} from "../util/findBestPlayerPerTour";

const ResultsTab = () => {
  const {score} = useSelector(state => state.game);
  const {wordStats} = useSelector(state => state.statistics);
  const {t} = useTranslation();

  const [gameStats, setGameStats] = useState({});
  const [teamByTourStats, setTeamByTourStats] = useState({});
  const [playerByTourStats, setPlayerByTourStats] = useState({});
  const [wordByTourStats, setWordByTourStats] = useState({});
  const [showDetailedStats, setShowDetailedStats] = useState(false);

  const uniqueTours = useMemo(
      () => [...new Set(wordStats.map(stat => stat.tour))], [wordStats]);

  const topTeam = useMemo(() => {
    return Object.entries(score).reduce(
        (highest, [team, currentScore]) =>
            currentScore > highest[1] ? [team, currentScore] : highest,
        ["", -Infinity]
    );
  }, [score]);

  useEffect(() => {
    setGameStats(findEasiestAndHardestWords(wordStats));
    setTeamByTourStats(findBestTeamPerTour(wordStats));
    setPlayerByTourStats(findBestPlayerPerTour(wordStats));
    setWordByTourStats(findEasiestAndHardestWordsPerTour(wordStats));
  }, [wordStats]);

  return (
      <Box>
        <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
        >
          <Typography variant="h3" sx={{fontSize: "20px", fontWeight: 600}}>
            {t("congratulations")}
          </Typography>

          <img src="/cap-0-v1.svg" alt="Cap"
               style={{width: "100px", paddingTop: "32px"}}/>

          <Typography sx={{fontSize: "16px", pt: 2.5}}>
            {topTeam[0]}
          </Typography>

          <Typography sx={{fontSize: "16px", color: "#6B6B6B", pt: 1}}>
            {topTeam[1]}
          </Typography>

          <Divider
              sx={{width: "95%", border: "1px solid #D1D1D1", mt: 4, mb: 2}}/>

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
        </Box>
      </Box>
  );
};

export default ResultsTab;
