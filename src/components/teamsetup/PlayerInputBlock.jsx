import React, {useEffect, useRef, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";

import {setTeams} from "../../redux/gameSlice";
import useTranslationAndDispatch from "../../hooks/useTranslationAndDispatch";
import InputWithDelete from "@/components/teamsetup/InputWithDelete";
import BaseInput from "@/components/teamsetup/BaseInput";

const PlayerInputBlock = ({teamIndex, playerIndex, player, error, newPlayer}) => {
    const [newPlayerName, setNewPlayerName] = useState('');
    const inputRef = useRef(null);
    const {dispatch, t} = useTranslationAndDispatch();
    const {teams} = useSelector(state => state.game);
    const theme = useTheme();

    const handlePlayerNameChange = (teamIndex, name) => {
        setNewPlayerName(name);
    };

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

    const handleNewPlayerBlur = (teamIndex) => {
        const trimmedName = newPlayerName.trim();
        if (trimmedName !== '') {
            const updatedTeams = [...teams];
            updatedTeams[teamIndex] = {
                ...updatedTeams[teamIndex],
                players: [...updatedTeams[teamIndex].players, trimmedName]
            };
            dispatch(setTeams(updatedTeams));
            handlePlayerNameChange(teamIndex, '');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (newPlayer) {
                handleNewPlayerBlur(teamIndex);
            }
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                if (newPlayer) {
                    handleNewPlayerBlur(teamIndex);
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [newPlayer, newPlayerName, teamIndex, teams]);

    return (
        <InputWithDelete onDelete={() => handleDeletePlayer(teamIndex, playerIndex)} newInput={newPlayer}>
          <BaseInput
              dataCy="player-name-input"
              inputRef={inputRef}
              placeholder={newPlayer ? t('enter-player-name') : ""}
              value={newPlayer ? newPlayerName : player}
              onChange={e =>
                  newPlayer
                      ? handlePlayerNameChange(teamIndex, e.target.value)
                      : handlePlayerNameChangeByIndex(playerIndex, teamIndex, e.target.value)
              }
              onBlur={() => newPlayer && handleNewPlayerBlur(teamIndex)}
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
