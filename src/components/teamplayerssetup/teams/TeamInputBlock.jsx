import InputAdornment from "@mui/material/InputAdornment";
import {useSelector} from "react-redux";
import React, {useRef} from "react";
import { useTheme } from '@mui/material/styles';

import {setTeams} from "@/redux/gameSlice";
import useTranslationAndDispatch from "../../../hooks/useTranslationAndDispatch";
import BaseInput from "@/components/teamplayerssetup/BaseInput";
import InputWithDelete from "@/components/teamplayerssetup/InputWithDelete";

const TeamInputBlock = ({teamName, error, teamIndex}) => {
    const {dispatch, t} = useTranslationAndDispatch();
    const {teams} = useSelector(state => state.game);
    const inputRef = useRef(null);
    const theme = useTheme();

    const handleTeamNameChangeByIndex = (index, name) => {
        const updatedTeams = [...teams];
        updatedTeams[index] = {...updatedTeams[index], name: name};
        dispatch(setTeams(updatedTeams));
    };

    const handleDeleteTeam = (teamIndexToDelete) => {
        dispatch(setTeams([...teams].filter((team, teamIndex) => teamIndex !== teamIndexToDelete)));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    return (
        <InputWithDelete onDelete={() => handleDeleteTeam(teamIndex)}>
            <BaseInput
                dataCy="team-name-input"
                inputRef={inputRef}
                backgroundColor={theme.colors.gray.dark}
                borderColor={theme.colors.gray.dark}
                activeBorderColor={theme.colors.control.primary}
                value={teamName}
                onChange={e => handleTeamNameChangeByIndex(teamIndex, e.target.value)}
                slotProps={{
                    input: {
                        sx: {fontWeight: '600'},
                        startAdornment: (
                            <InputAdornment position="start">
                                <img width="40px" src={`/cap-${teamIndex % 3}-v1.svg`} alt="Cap"/>
                            </InputAdornment>
                        )
                    }
                }}
                onKeyDown={handleKeyDown}
                error={error?.error}
                helperText={t(error?.helperText)}
            />
        </InputWithDelete>
    );
};

export default TeamInputBlock;
