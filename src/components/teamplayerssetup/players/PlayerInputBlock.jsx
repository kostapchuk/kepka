import React, {useRef} from "react";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";

import {setTeams} from "../../../redux/gameSlice";
import useTranslationAndDispatch from "../../../hooks/useTranslationAndDispatch";
import BaseInput from "@/components/teamplayerssetup/BaseInput";
import InputWithDelete from "@/components/teamplayerssetup/InputWithDelete";

const PlayerInputBlock = ({teamIndex, playerIndex, player, error}) => {
    const inputRef = useRef(null);
    const {dispatch, t} = useTranslationAndDispatch();
    const {teams} = useSelector(state => state.game);
    const theme = useTheme();

    const handleDeletePlayer = (teamIndex, playerIndexToDelete) => {
        const updatedTeams = [...teams];
        updatedTeams[teamIndex] = {
            ...teams[teamIndex],
            players: teams[teamIndex].players.filter((player, playerIndex) => playerIndex !== playerIndexToDelete)
        };
        dispatch(setTeams(updatedTeams));
    };

    const handlePlayerNameChangeByIndex = (playerIndex, teamIndex, name) => {
        const updatedTeams = [...teams];
        const updatedPlayers = [...updatedTeams[teamIndex].players];
        updatedPlayers[playerIndex] = name;
        updatedTeams[teamIndex] = {
            ...updatedTeams[teamIndex],
            players: updatedPlayers
        };
        dispatch(setTeams(updatedTeams));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    return (
        <InputWithDelete onDelete={() => handleDeletePlayer(teamIndex, playerIndex)}>
          <BaseInput
              dataCy="player-name-input"
              inputRef={inputRef}
              value={player}
              onChange={e => handlePlayerNameChangeByIndex(playerIndex, teamIndex, e.target.value)}
              onKeyDown={handleKeyDown}
              error={!!error}
              helperText={t(error?.helperText)}
              borderColor={theme.colors.stroke.default}
              activeBorderColor={theme.colors.control.primary}
          />
        </InputWithDelete>
    );
};

export default PlayerInputBlock;
