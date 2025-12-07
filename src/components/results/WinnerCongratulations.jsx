import {Typography} from "@mui/material";
import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const WinnerCongratulations = () => {

  const {score} = useSelector(state => state.game);
  const {t} = useTranslation();

  const topTeam = useMemo(() => {
    return Object.entries(score).reduce(
        (highest, [team, currentScore], currentIndex) =>
            currentScore > highest[1] ? [team, currentScore, currentIndex] : highest,
        ["", -Infinity]
    );
  }, [score]);

  return (
      <>
        <Typography variant="h3" sx={{fontSize: "20px", fontWeight: 600}}>
          {t("congratulations")}
        </Typography>

        <Typography sx={{fontSize: "16px", pt: 2.5}}>
          {topTeam[0]}
        </Typography>

        <Typography sx={{fontSize: "16px", color: "#6B6B6B", pt: 1}}>
          {topTeam[1]}
        </Typography>
      </>
  )
}

export default WinnerCongratulations;