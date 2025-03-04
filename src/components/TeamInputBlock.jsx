import {Box, InputAdornment, TextField} from "@mui/material";
import {setTeams} from "../redux/gameSlice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

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

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <TextField
                sx={{backgroundColor: '#F6F5F8'}}
                key={newTeam ? "emptyTeamInputKey" : teamIndex + "teamInputKey"}
                label={newTeam ? "Введите имя новой команды" : ""}
                value={newTeam ? newTeamName : teamName}
                onChange={(e) =>
                    newTeam ? handleTeamNameChange(e.target.value) : handleTeamNameChangeByIndex(teamIndex, e.target.value)
                }
                variant="outlined"
                onBlur={() => newTeam && handleNewTeamBlur()}
                fullWidth
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <img src="/cap.svg" alt="Cap"/>
                            </InputAdornment>
                        )
                    }
                }}
                error={error?.error}
                helperText={error?.helperText}
            />
            {!newTeam &&
                <img
                    src="/close.svg"
                    alt="Delete team"
                    onClick={() => handleDeleteTeam(teamIndex)}
                    style={{cursor: 'pointer', marginLeft: '8px'}}
                />
            }
        </Box>
    )
}

export default TeamInputBlock
