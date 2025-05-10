import React, {useEffect, useRef, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";

import {setTeams} from "../../../redux/gameSlice";
import useTranslationAndDispatch from "../../../hooks/useTranslationAndDispatch";
import InputWithDelete from "@/components/teamplayerssetup/InputWithDelete";
import BaseInput from "@/components/teamplayerssetup/BaseInput";

const NewPlayerInputBlock = ({teamIndex}) => {
    const [newPlayerName, setNewPlayerName] = useState('');
    const inputRef = useRef(null);
    const {dispatch, t} = useTranslationAndDispatch();
    const {teams} = useSelector(state => state.game);
    const theme = useTheme();

    const handlePlayerNameChange = (teamIndex, name) => {
        setNewPlayerName(name);
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
            handleNewPlayerBlur(teamIndex);
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                handleNewPlayerBlur(teamIndex);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [newPlayerName, teamIndex, teams]);

    return (
        <InputWithDelete newInput>
          <BaseInput
              dataCy="player-name-input"
              inputRef={inputRef}
              placeholder={t('enter-player-name')}
              value={newPlayerName}
              onChange={e => handlePlayerNameChange(teamIndex, e.target.value)}
              onBlur={() => handleNewPlayerBlur(teamIndex)}
              onKeyDown={handleKeyDown}
              borderColor={theme.colors.stroke.default}
              activeBorderColor={theme.colors.control.primary}
          />
        </InputWithDelete>
    );
};

export default NewPlayerInputBlock;
