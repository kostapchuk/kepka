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
        <Box display="flex" alignItems="flex-start" gap={1}>
            <TextField
                autoComplete="off"
                data-cy="team-name-input"
                inputRef={inputRef}
                sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: theme.colors.gray.dark,
                      '& fieldset': {
                        borderColor: theme.colors.gray.dark
                      },
                      '&:hover fieldset': {
                        borderColor: error?.error ? theme.palette.error.main : theme.colors.gray.dark
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.colors.control.primary
                      }
                    },
                    flex: 1
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
                    visibility: newTeam ? "hidden" : "visible",
                    marginTop: '16px'
                }}
            />
        </Box>
    );
};

export default TeamInputBlock;
