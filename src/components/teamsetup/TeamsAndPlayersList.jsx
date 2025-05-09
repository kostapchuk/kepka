import TeamInputBlock from "./TeamInputBlock";
import PlayerInputBlock from "./PlayerInputBlock";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {Stack, useTheme} from "@mui/material";
import React from 'react';
import {useTranslation} from "react-i18next";

const TeamsAndPlayersList = ({teamError, playerError, commonErrors}) => {
  const {teams} = useSelector(state => state.game);
  const theme = useTheme();
  const {t} = useTranslation();

  return (
      <Stack spacing={4} mt={3}>
        {teams.map((team, teamIndex) => (
            <Stack key={teamIndex} spacing={2}>
                <TeamInputBlock
                    teamName={team.name}
                    error={teamError.find(error => error.error === teamIndex)}
                    teamIndex={teamIndex}
                />
              <Stack spacing={2}>
                {team.players.map((player, playerIndex) =>
                    <PlayerInputBlock
                        teamIndex={teamIndex}
                        playerIndex={playerIndex}
                        player={player}
                        error={playerError.find(
                            error => error.teamIndex === teamIndex
                                && error.playerIndex === playerIndex)}
                    />
                )}
                <PlayerInputBlock
                    teamIndex={teamIndex}
                    playerIndex={-1}
                    newPlayer
                />
              </Stack>
            </Stack>
        ))}
        <TeamInputBlock newTeam teamIndex={-1}/>
        {commonErrors.map(error => <Typography color="error">{t(error)}</Typography>)}
      </Stack>
  )
}

export default TeamsAndPlayersList;
