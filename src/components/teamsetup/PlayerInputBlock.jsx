import React, {useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useSelector} from "react-redux";

import {setTeams} from "../../redux/gameSlice";
import useTranslationAndDispatch from "../../hooks/useTranslationAndDispatch";
import {useTheme} from "@mui/material/styles";

const PlayerInputBlock = ({
                              teamIndex,
                              playerIndex,
                              player,
                              error,
                              newPlayer
                          }) => {
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
        <Box display="flex" alignItems="flex-start" gap={1}>
            <TextField
                autoComplete="off"
                data-cy="player-name-input"
                inputRef={inputRef}
                sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '& fieldset': {
                        borderColor: theme.colors.stroke.default
                      },
                      '&:hover fieldset': {
                        borderColor: error ? theme.palette.error.main : theme.colors.stroke.default
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.colors.control.primary
                      }
                    },
                    flex: 1
                }}
                placeholder={newPlayer ? t('enter-player-name') : ""}
                value={newPlayer ? newPlayerName : player}
                onChange={(e) =>
                    newPlayer
                        ? handlePlayerNameChange(teamIndex, e.target.value)
                        : handlePlayerNameChangeByIndex(playerIndex, teamIndex, e.target.value)
                }
                onBlur={() => newPlayer && handleNewPlayerBlur(teamIndex)}
                onKeyDown={handleKeyDown}
                error={!!error}
                helperText={t(error?.helperText)}
            />
            <img
                src="/close.svg"
                alt="Delete player"
                onClick={() => handleDeletePlayer(teamIndex, playerIndex)}
                style={{
                    cursor: 'pointer',
                    width: '24px',
                    visibility: newPlayer ? "hidden" : "visible",
                    marginTop: '16px'
                }}
            />
        </Box>
    );
};

export default PlayerInputBlock;
