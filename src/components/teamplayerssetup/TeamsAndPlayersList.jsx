import {useSelector} from "react-redux";
import {Stack} from "@mui/material";
import React, {useState} from 'react';

import TeamInputBlock from "./teams/TeamInputBlock";
import PlayerInputBlock from "./players/PlayerInputBlock";
import NewPlayerInputBlock
  from "@/components/teamplayerssetup/players/NewPlayerInputBlock";
import NewTeamInputBlock
  from "@/components/teamplayerssetup/teams/NewTeamInputBlock";

const TeamsAndPlayersList = () => {
  const {teams, teamErrors, playerErrors} = useSelector(state => state.game);

  return (
      <Stack spacing={4} mt={3} mb={2}>
        {teams.map((team, teamIndex) =>
            <Stack key={teamIndex} spacing={2}>
                <TeamInputBlock
                    teamName={team.name}
                    error={teamErrors.find(error => error.error === teamIndex)}
                    teamIndex={teamIndex}
                />
              <Stack spacing={2}>
                {team.players.map((player, playerIndex) =>
                    <PlayerInputBlock
                        teamIndex={teamIndex}
                        playerIndex={playerIndex}
                        player={player}
                        error={playerErrors.find(
                            error => error.teamIndex === teamIndex
                                && error.playerIndex === playerIndex)}
                    />
                )}
                <NewPlayerInputBlock teamIndex={teamIndex}/>
              </Stack>
            </Stack>
        )}
        <NewTeamInputBlock/>
      </Stack>
  )
}

export default TeamsAndPlayersList;
