import React from 'react';
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import BaseModal from "../ui/BaseModal";
import {setRandomizerModalOpen, setTeamCount, setTeams} from "../../redux/gameSlice";
import {randomIndex, shuffle} from "../../util/arrayUtils";
import {addPlayers, reset} from "../../redux/playersSlice";
import useTranslationAndDispatch from "../../hooks/useTranslationAndDispatch";

const RandomizerModal = () => {

    const {randomizerModalOpen, currentGameId, teams: existingTeams, teamCount} = useSelector(state => state.game);

    const {dispatch, t} = useTranslationAndDispatch();

    const generateTeams = () => {
        const playerNames = existingTeams.flatMap(t => t.players);

        const shuffledPlayers = shuffle(playerNames);

        const teams = Array.from({length: teamCount}, (_, index) => ({
            name: `${t('team')} ${index + 1}`,
            players: []
        }));

        shuffledPlayers.forEach((player, index) => {
            const teamIndex = index % teamCount;
            teams[teamIndex].players.push(player);
        });

        dispatch(setTeams(teams));

        dispatch(reset());
        teams.forEach(team => {
            const players = team.players;
            const askerIndex = randomIndex(team.players);
            const newPlayers = players.map((name, index) => ({
                name: name,
                asker: index === askerIndex,
                teamId: team.name,
                gameId: currentGameId
            }));
            dispatch(addPlayers(newPlayers));
        })
        closeModal();
    }


    const closeModal = () => {
        dispatch(setRandomizerModalOpen(false));
    };

    return <BaseModal
        open={randomizerModalOpen}
        title={t('generate-teams')}
        content={
            <>
                <Typography>{t('fill-players')}</Typography>
                <Typography>{t('enter-teams-count')}</Typography>
                <TextField
                    type="tel"
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
                    placeholder={t('enter-teams-count')}
                    value={teamCount}
                    onChange={(e) => dispatch(setTeamCount(e.target.value))}
                    variant="outlined"
                    fullWidth
                />
            </>
        }
        onlyPrimary
        primaryButtonText={t('generate')}
        onPrimaryAction={generateTeams}
        onClose={closeModal}
    />
};

export default RandomizerModal;
