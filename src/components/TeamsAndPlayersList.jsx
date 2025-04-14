import TeamInputBlock from "./TeamInputBlock";
import PlayerInputBlock from "./PlayerInputBlock";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material";
import React from 'react';
import {useTranslation} from "react-i18next";
import useTeamValidation from "../hooks/useTeamValidation";

const TeamsAndPlayersList = () => {
  const {teams} = useSelector(state => state.game);
  const theme = useTheme();
  const {t} = useTranslation();

  const {teamError, playerError, commonErrors} = useTeamValidation(teams);

  return (
      <>
        {teams.map((team, teamIndex) => (
            <>
              <TeamInputBlock
                  teamName={team.name}
                  error={teamError.find(error => error.error === teamIndex)}
                  teamIndex={teamIndex}
              />
              {team.players.map((player, playerIndex) => (
                  <PlayerInputBlock
                      teamIndex={teamIndex}
                      playerIndex={playerIndex}
                      player={player}
                      error={playerError.find(
                          error => error.teamIndex === teamIndex
                              && error.playerIndex === playerIndex)}
                  />
              ))}
              <PlayerInputBlock
                  teamIndex={teamIndex}
                  playerIndex={-1}
                  newPlayer
              />
            </>
        ))}
        <TeamInputBlock newTeam teamIndex={-1}/>
        {commonErrors.map(
            error => <Typography color={theme.palette.error.main}>{t(
                error)}</Typography>)}
      </>
  )
}

export default TeamsAndPlayersList;
