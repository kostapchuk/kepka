import {Box, TextField} from "@mui/material";
import {setTeams} from "../redux/gameSlice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

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
        }
    }

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <TextField
                key={`${teamIndex}${playerIndex}`}
                value={newPlayer ? newPlayerName : player}
                onChange={(e) =>
                    newPlayer ? handlePlayerNameChange(teamIndex, e.target.value) : handlePlayerNameChangeByIndex(playerIndex, teamIndex, e.target.value)
                }
                variant="outlined"
                onBlur={() => newPlayer && handleNewPlayerBlur(teamIndex)}
                fullWidth
                error={error}
                helperText={error?.helperText}
            />
            {!newPlayer &&
                <img
                    src="/close.svg"
                    alt="Delete player"
                    onClick={() => handleDeletePlayer(teamIndex, playerIndex)}
                    style={{cursor: 'pointer', marginLeft: '8px'}}
                />
            }
        </Box>
    )
}

export default PlayerInputBlock
