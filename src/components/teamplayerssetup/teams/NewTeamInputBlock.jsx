import InputAdornment from "@mui/material/InputAdornment";
import {useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import { useTheme } from '@mui/material/styles';

import {setTeams} from "@/redux/gameSlice";
import useTranslationAndDispatch from "../../../hooks/useTranslationAndDispatch";
import InputWithDelete from "@/components/teamplayerssetup/InputWithDelete";
import BaseInput from "@/components/shared/BaseInput";

const NewTeamInputBlock = () => {
    const {dispatch, t} = useTranslationAndDispatch();
    const {teams} = useSelector(state => state.game);
    const [newTeamName, setNewTeamName] = useState('');
    const inputRef = useRef(null);
    const theme = useTheme();

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

    const handleClick = () => {
        if (newTeamName.trim() === '') {
            setNewTeamName(`${t('team')} ` + (teams.length + 1));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleNewTeamBlur();
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                handleNewTeamBlur();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [newTeamName]);

    return (
        <InputWithDelete newInput>
            <BaseInput
                dataCy="team-name-input"
                inputRef={inputRef}
                backgroundColor={theme.colors.gray.light}
                borderColor={theme.colors.gray.light}
                activeBorderColor={theme.colors.control.primary}
                placeholder={t('team-name')}
                value={newTeamName}
                onChange={e => handleTeamNameChange(e.target.value)}
                onClick={handleClick}
                onBlur={handleNewTeamBlur}
                slotProps={{
                    input: {
                        sx: {fontWeight: '600'},
                        startAdornment: (
                            <InputAdornment position="start">
                                <img width="40px" src={`/cap-${teams.length % 3}-v1.svg`} alt="Cap"/>
                            </InputAdornment>
                        )
                    }
                }}
                onKeyDown={handleKeyDown}
            />
        </InputWithDelete>
    );
};

export default NewTeamInputBlock;
