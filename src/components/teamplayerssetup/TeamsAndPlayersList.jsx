import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import React from 'react';
import {useTranslation} from "react-i18next";

import TeamInputBlock from "./teams/TeamInputBlock";
import PlayerInputBlock from "./players/PlayerInputBlock";
import NewPlayerInputBlock
  from "@/components/teamplayerssetup/players/NewPlayerInputBlock";
import NewTeamInputBlock
  from "@/components/teamplayerssetup/teams/NewTeamInputBlock";

const TeamsAndPlayersList = ({teamError, playerError, commonErrors}) => {
  const {teams} = useSelector(state => state.game);
  const {t} = useTranslation();

  return (
      <Stack spacing={4} mt={3} mb={2}>
        {teams.map((team, teamIndex) =>
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
                <NewPlayerInputBlock teamIndex={teamIndex}/>
              </Stack>
            </Stack>
        )}
        <NewTeamInputBlock/>
        {commonErrors.map(error => <Typography color="error">{t(error)}</Typography>)}
      </Stack>
  )
}

export default TeamsAndPlayersList;
