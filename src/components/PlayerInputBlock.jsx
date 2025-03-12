import {Box, InputAdornment, TextField} from "@mui/material";
import {setTeams} from "../redux/gameSlice";
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";

const PlayerInputBlock = ({
                              teamIndex,
                              playerIndex,
                              player,
                              error,
                              newPlayer
                          }) => {
    const [newPlayerName, setNewPlayerName] = useState('');

    const handlePlayerNameChange = (teamIndex, name) => {
        setNewPlayerName(name)
    };

    const dispatch = useDispatch();
    const {teams} = useSelector(state => state.game);

    const handleDeletePlayer = (teamIndex, playerIndexToDelete) => {
        const updatedTeams = [...teams]
        updatedTeams[teamIndex] = {
            ...teams[teamIndex],
            players: teams[teamIndex].players.filter((player, playerIndex) => playerIndex !== playerIndexToDelete)
        }
        dispatch(setTeams(updatedTeams))
    }

    const handlePlayerNameChangeByIndex = (playerIndex, teamIndex, name) => {
        const updatedTeams = [...teams];
        const updatedPlayers = [...updatedTeams[teamIndex].players]
        updatedPlayers[playerIndex] = name
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
            inputRef.current.blur();
        }
    }

    const inputRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (newPlayer) {
                handleNewPlayerBlur(teamIndex);
            }
        }
    };

    return (
        <Box sx={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
            <TextField
                inputRef={inputRef}
                sx={{
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '& fieldset': {
                            borderColor: '#D1D1D1'
                        },
                        '&:hover fieldset': {
                            borderColor: '#D1D1D1'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#7A51EC'
                        }
                    },
                    '&:focus': {
                        backgroundColor: 'transparent'
                    },
                    flex: 1,
                    minWidth: '50px'
                }}
                key={`${teamIndex}${playerIndex}`}
                placeholder={newPlayer && "Введите имя игрока"}
                value={newPlayer ? newPlayerName : player}
                onChange={(e) =>
                    newPlayer ? handlePlayerNameChange(teamIndex, e.target.value) : handlePlayerNameChangeByIndex(playerIndex, teamIndex, e.target.value)
                }
                variant="outlined"
                onBlur={() => newPlayer && handleNewPlayerBlur(teamIndex)}
                onKeyDown={handleKeyDown}
                fullWidth
                error={error}
                helperText={error?.helperText}
            />
            <img
                src="/close.svg"
                alt="Delete player"
                onClick={() => handleDeletePlayer(teamIndex, playerIndex)}
                style={{
                    cursor: 'pointer',
                    width: '24px',
                    visibility: newPlayer ? "hidden" : "visible",
                    marginLeft: '8px'
                }}
            />
        </Box>
    )
}

export default PlayerInputBlock
