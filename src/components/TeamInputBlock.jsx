import {Box, InputAdornment, TextField} from "@mui/material";
import {setTeams} from "../redux/gameSlice";
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";

const TeamInputBlock = ({
                            teamName,
                            newTeam,
                            error,
                            teamIndex
                        }) => {
    const dispatch = useDispatch();
    const {teams} = useSelector(state => state.game);

    const [newTeamName, setNewTeamName] = useState('');

    const handleTeamNameChangeByIndex = (index, name) => {
        const updatedTeams = [...teams];
        updatedTeams[index] = {...updatedTeams[index], name: name};
        dispatch(setTeams(updatedTeams));
    };

    const handleNewTeamBlur = () => {
        const trimmedName = newTeamName.trim();
        if (trimmedName !== '') {
            dispatch(setTeams([...teams, {name: newTeamName, players: []}]));
            setNewTeamName('');
        }
    }

    const handleTeamNameChange = (name) => {
        setNewTeamName(name);
    };

    const handleDeleteTeam = (teamIndexToDelete) => {
        dispatch(setTeams([...teams].filter((team, teamIndex) => teamIndex !== teamIndexToDelete)));
    }

    const handleClick = () => {
        if (newTeamName.trim() === '') {
            setNewTeamName('Команда ' + (teams.length + 1));
        }
    }
    const inputRef = useRef(null);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (newTeam) {
                handleNewTeamBlur();
            }
            inputRef.current.blur();
        }
    };

    return (
        <Box sx={{display: 'flex'}}>
            <TextField
                inputRef={inputRef}
                sx={{
                    backgroundColor: '#F6F5F8',
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '& fieldset': {
                            borderColor: 'transparent'
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#D1D1D1'
                        }
                    },
                    '&:focus': {
                        backgroundColor: 'transparent'
                    },
                    flex: 1,
                    minWidth: '50px',
                    marginBottom: '16px',
                    marginTop: '16px',
                    fontWeight: '600'
                }}
                key={newTeam ? "emptyTeamInputKey" : teamIndex + "teamInputKey"}
                placeholder={newTeam ? "Название команды" : ""}
                value={newTeam ? newTeamName : teamName}
                onChange={(e) =>
                    newTeam ? handleTeamNameChange(e.target.value) : handleTeamNameChangeByIndex(teamIndex, e.target.value)
                }
                onClick={() => newTeam && handleClick()}
                onBlur={() => newTeam && handleNewTeamBlur()}
                slotProps={{
                    input: {
                        sx: {
                            fontWeight: '600'
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <img src="/cap.svg" alt="Cap"/>
                            </InputAdornment>
                        )
                    }
                }}
                onKeyDown={handleKeyDown}
                error={error?.error}
                helperText={error?.helperText}
            />
            <img
                src="/close.svg"
                alt="Delete team"
                onClick={() => handleDeleteTeam(teamIndex)}
                style={{
                    cursor: 'pointer',
                    width: '24px',
                    visibility: newTeam ? "hidden" : "visible",
                    marginLeft: '8px'
                }}
            />
        </Box>
    )
}

export default TeamInputBlock
