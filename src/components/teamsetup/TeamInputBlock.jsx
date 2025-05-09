import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {setTeams} from "@/redux/gameSlice";
import {useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import useTranslationAndDispatch from "../../hooks/useTranslationAndDispatch";
import { useTheme } from '@mui/material/styles';

const TeamInputBlock = ({
                            teamName,
                            newTeam,
                            error,
                            teamIndex
                        }) => {
    const {dispatch, t} = useTranslationAndDispatch();
    const {teams} = useSelector(state => state.game);
    const [newTeamName, setNewTeamName] = useState('');
    const inputRef = useRef(null);
    const theme = useTheme();

    const handleTeamNameChangeByIndex = (index, name) => {
        const updatedTeams = [...teams];
        updatedTeams[index] = {...updatedTeams[index], name: name};
        dispatch(setTeams(updatedTeams));
    };

    const handleNewTeamBlur = () => {
        const trimmedName = newTeamName.trim();
        if (trimmedName !== '') {
            dispatch(setTeams([...teams, {name: trimmedName, players: []}]));
            setNewTeamName('');
        }
    };

    const handleTeamNameChange = (name) => {
        setNewTeamName(name);
    };

    const handleDeleteTeam = (teamIndexToDelete) => {
        dispatch(setTeams([...teams].filter((team, teamIndex) => teamIndex !== teamIndexToDelete)));
    };

    const handleClick = () => {
        if (newTeamName.trim() === '') {
            setNewTeamName(`${t('team')} ` + (teams.length + 1));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (newTeam) {
                handleNewTeamBlur();
            }
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                if (newTeam) {
                    handleNewTeamBlur();
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [newTeam, newTeamName]);

    return (
        <Box sx={{
          display: 'flex',
          gap: '8px'
        }}>
            <TextField
                data-cy="team-name-input"
                inputRef={inputRef}
                sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#F6F5F8',
                      '& fieldset': {
                        borderColor: '#F6F5F8'
                      },
                      '&:hover fieldset': {
                        borderColor: error?.error ? theme.palette.error.main : '#F6F5F8'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#7A51EC'
                      }
                    },
                    flex: 1,
                    minWidth: '50px',
                    marginBottom: '16px',
                    marginTop: '16px'
                }}
                placeholder={newTeam ? t('team-name') : ""}
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
                                <img width="40px" src={`/cap-${(newTeam ? teams.length : teamIndex) % 3}-v1.svg`} alt="Cap"/>
                            </InputAdornment>
                        )
                    }
                }}
                onKeyDown={handleKeyDown}
                error={error?.error}
                helperText={t(error?.helperText)}
            />
            <img
                src="/close.svg"
                alt="Delete team"
                onClick={() => handleDeleteTeam(teamIndex)}
                style={{
                    cursor: 'pointer',
                    width: '24px',
                    visibility: newTeam ? "hidden" : "visible"
                }}
            />
        </Box>
    );
};

export default TeamInputBlock;
