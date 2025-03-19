import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import React, {useState} from "react";

import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import {addPlayers} from "../redux/playersSlice";
import {randomIndex} from "../util/arrayUtils";
import TeamSetupHeader from "../components/TeamSetupHeader";
import TeamsAndPlayersList from "../components/TeamsAndPlayersList";
import PrimaryButton from "../components/PrimaryButton";
import ScrollablePageWithStickyFooter from "../components/ScrollablePageWithStickyFooter";
import {setRandomizerModalOpen} from "../redux/gameSlice";
import useTranslationAndDispatch from "../hooks/useTranslationAndDispatch";

const TeamSetupPage = () => {
    const {currentGameId, teams} = useSelector(state => state.game);
    const [teamError, setTeamError] = useState([]);
    const [playerError, setPlayerError] = useState([]);
    const [commonErrors, setCommonErrors] = useState([]);
    const {dispatch, t} = useTranslationAndDispatch();

    function validateTeamsCount() {
        if (teams.length < 2) {
            setCommonErrors(prevState => [...prevState, 'Нужны минимум 2 команды, чтобы начать игру'])
            return 1;
        }
        return 0;
    }

    function validateEachTeamHasPlayer() {
        const eachTeamHasAtLeastOnePlayer = teams.filter(t => t.players.length < 1)
        if (eachTeamHasAtLeastOnePlayer.length > 0) {
            setCommonErrors(prevState => [...prevState, 'Нужен минимум 1 игрок в каждой команде'])
            return 1;
        }
        return 0;
    }

    function validateTeamsUniqueAndEmptyNames() {
        let errorCount = 0;
        const uniqueTeamNames = new Set();
        teams.forEach((team, teamIndex) => {
            if (team.name === '') {
                errorCount++;
                setTeamError(prevState => [
                    ...prevState,
                    {error: teamIndex, helperText: "Пустое название команды не разрешено"}
                ]);
            } else {
                if (uniqueTeamNames.has(team.name)) {
                    errorCount++;
                    setTeamError(prevState => [
                        ...prevState,
                        {error: teamIndex, helperText: "Команда с таким именем уже существует"}
                    ]);
                } else {
                    uniqueTeamNames.add(team.name);
                }
            }
        })
        return errorCount;
    }

    function validatePlayersUniqueAndEmptyNames() {
        let errorCount = 0;
        teams.forEach((team, teamIndex) => {
            const uniquePlayerNamesInTeam = new Set();
            team.players.forEach((player, playerIndex) => {
                if (player === '') {
                    errorCount++;
                    setPlayerError(prevState => [
                        ...prevState,
                        {teamIndex, playerIndex, helperText: "Пустое имя игрока не разрешено"}
                    ]);
                } else {
                    if (uniquePlayerNamesInTeam.has(player)) {
                        errorCount++;
                        setPlayerError(prevState => [
                            ...prevState,
                            {teamIndex, playerIndex, helperText: "Игрок с таким именем уже существует"}
                        ]);
                    } else {
                        uniquePlayerNamesInTeam.add(player);
                    }
                }
            })
        })
        return errorCount;
    }

    const areTeamsAndPlayersValid = () => {
        let errorCount = 0;
        setTeamError([]);
        setPlayerError([]);
        setCommonErrors([]);
        errorCount += validateTeamsCount();
        errorCount += validateEachTeamHasPlayer();
        errorCount += validateTeamsUniqueAndEmptyNames();
        errorCount += validatePlayersUniqueAndEmptyNames();
        return errorCount === 0;
    }

    const goToNextPage = () => {
        if (!areTeamsAndPlayersValid()) {
            return;
        }
        teams.forEach(team => {
            const players = team.players
            const askerIndex = randomIndex(team.players);
            const newPlayers = players.map((name, index) => ({
                name: name,
                asker: index === askerIndex,
                teamId: team.name,
                gameId: currentGameId
            }));
            dispatch(addPlayers(newPlayers));
        })
        dispatch(setCurrentPage(Pages.WORDS_SETUP_PAGE));
    }

    const pageContent = (
        <>
            {/*{window.matchMedia('(display-mode: standalone)').matches ? "Home screen" : "Web"}*/}
            <TeamSetupHeader/>
            <TeamsAndPlayersList
                teamError={teamError}
                playerError={playerError}
                commonErrors={commonErrors}
            />
        </>
    );

    const pageFooter = (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            <img
                src="/random-arrows.svg"
                onClick={() => dispatch(setRandomizerModalOpen(true))}
                alt="Generate teams"
                style={{
                    backgroundColor: '#f0f0f0',
                    padding: '12px',
                    borderRadius: '12px',
                    marginRight: '12px'
                }}
            />
            <PrimaryButton onClick={goToNextPage} content={t('continue')}/>
        </Box>
    );

    return (
        <ScrollablePageWithStickyFooter
            children={pageContent}
            footer={pageFooter}
        />
    );
};
export default TeamSetupPage;
