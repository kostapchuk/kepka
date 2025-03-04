import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Footer from "../components/Footer";
import {addPlayers} from "../redux/playersSlice";
import {randomIndex} from "../util/arrayUtils";
import TeamInputBlock from "../components/TeamInputBlock";
import PlayerInputBlock from "../components/PlayerInputBlock";
import {Box, Typography} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {setTeams} from "../redux/gameSlice";

// todo: separate components
// todo: design
// todo: trim everything before save (not allow user to enter something with around spaces)
const TeamSetupPage = () => {
    const dispatch = useDispatch();
    const {currentGameId, teams} = useSelector(state => state.game)
    const [playerNames, setPlayerNames] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [teamError, setTeamError] = useState([])
    const [playerError, setPlayerError] = useState([])
    const [commonErrors, setCommonErrors] = useState([])

    const handlePlayerNameChange = (teamIndex, name) => {
        const updatedNames = [...playerNames];
        updatedNames[teamIndex] = name;
        setPlayerNames(updatedNames);
    };

    const handleNewPlayerBlur = (teamIndex) => {
        const trimmedName = playerNames[teamIndex]?.trim();
        if (trimmedName && trimmedName !== '') {
            const updatedTeams = [...teams];
            updatedTeams[teamIndex] = {
                ...updatedTeams[teamIndex],
                players: [...updatedTeams[teamIndex].players, playerNames[teamIndex]]
            };
            dispatch(setTeams(updatedTeams));
            handlePlayerNameChange(teamIndex, '');
        }
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

    const handleTeamNameChange = (name) => {
        setTeamName(name);
    };

    const handleNewTeamBlur = () => {
        const trimmedName = teamName.trim();
        if (trimmedName !== '') {
            dispatch(setTeams([...teams, {name: teamName, players: []}]));
            setTeamName('');
        }
    }

    const handleTeamNameChangeByIndex = (index, name) => {
        const updatedTeams = [...teams];
        updatedTeams[index] = {...updatedTeams[index], name: name};
        dispatch(setTeams(updatedTeams));
        setPlayerNames(prevState => [...prevState, ''])
    };

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
        dispatch(setCurrentPage(Pages.GAME_SETUP_PAGE));
    }

    function validateTeamsCount() {
        if (teams.length < 2) {
            setCommonErrors(prevState => [...prevState, 'At least 2 teams should present to start game'])
            return 1;
        }
        return 0;
    }

    function validateEachTeamHasPlayer() {
        const eachTeamHasAtLeastOnePlayer = teams.filter(t => t.players.length < 1)
        if (eachTeamHasAtLeastOnePlayer.length > 0) {
            setCommonErrors(prevState => [...prevState, 'At least 1 player should be in team'])
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
                    {error: teamIndex, helperText: "Empty team name isn't allowed"}
                ]);
            } else {
                if (uniqueTeamNames.has(team.name)) {
                    errorCount++;
                    setTeamError(prevState => [
                        ...prevState,
                        {error: teamIndex, helperText: "Team name already exists"}
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
                        {teamIndex, playerIndex, helperText: "Empty player name isn't allowed"}
                    ]);
                } else {
                    if (uniquePlayerNamesInTeam.has(player)) {
                        errorCount++;
                        setPlayerError(prevState => [
                            ...prevState,
                            {teamIndex, playerIndex, helperText: "Player name already exists in the team"}
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

    const handleDeleteTeam = (teamIndexToDelete) => {
        dispatch(setTeams([...teams].filter((team, teamIndex) => teamIndex !== teamIndexToDelete)));
    }

    const handleDeletePlayer = (teamIndex, playerIndexToDelete) => {
        const updatedTeams = [...teams]
        updatedTeams[teamIndex] = {
            ...teams[teamIndex],
            players: teams[teamIndex].players.filter((player, playerIndex) => playerIndex !== playerIndexToDelete)
        }
        dispatch(setTeams(updatedTeams))
    }
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <Stack spacing={2}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography>Настройка игры 1 / 3</Typography>
                <Tooltip
                    title="Скоро"
                    arrow
                    open={tooltipOpen}
                    onClose={() => setTooltipOpen(false)}
                >
                    <img src="/language.svg" alt="Change language" width="28" onClick={() => setTooltipOpen(true)}/>
                </Tooltip>
            </Box>
            {teams.map((team, teamIndex) => (
                <>
                    <TeamInputBlock
                        teamName={team.name}
                        handleTeamBlur={() => {
                        }}
                        handleNewTeamBlur={() => {
                        }}
                        handleTeamNameChange={() => {
                        }}
                        handleTeamNameChangeByIndex={handleTeamNameChangeByIndex}
                        error={teamError.find(error => error.error === teamIndex)}
                        teamIndex={teamIndex}
                        handleDeleteTeam={() => handleDeleteTeam(teamIndex)}
                    />
                    {team.players.map((player, playerIndex) => (
                        <PlayerInputBlock
                            teamIndex={teamIndex}
                            playerIndex={playerIndex}
                            player={player}
                            handlePlayerNameChange={() => {
                            }}
                            handlePlayerNameChangeByIndex={handlePlayerNameChangeByIndex}
                            handlePlayerBlur={() => {
                            }}
                            handleNewPlayerBlur={() => {
                            }}
                            error={playerError.find(error => error.teamIndex === teamIndex && error.playerIndex === playerIndex)}
                            handleDeletePlayer={() => handleDeletePlayer(teamIndex, playerIndex)}
                        />
                    ))}
                    <PlayerInputBlock
                        teamIndex={teamIndex}
                        playerIndex={-1}
                        player={playerNames[teamIndex]}
                        handlePlayerNameChange={handlePlayerNameChange}
                        handlePlayerNameChangeByIndex={() => {
                        }}
                        handlePlayerBlur={() => {
                        }}
                        handleNewPlayerBlur={handleNewPlayerBlur}
                        handleDeletePlayer={() => {
                        }}
                        newPlayer
                    />
                </>
            ))}
            <TeamInputBlock
                teamName={teamName}
                handleTeamBlur={() => {
                }}
                handleNewTeamBlur={handleNewTeamBlur}
                handleTeamNameChange={handleTeamNameChange}
                handleTeamNameChangeByIndex={() => {
                }}
                newTeam
                teamIndex={-1}
                handleDeleteTeam={() => {
                }}
            />
            {commonErrors.map(error => <p>{error}</p>)}
            <Button variant="contained" onClick={goToNextPage}>
                Продолжить
            </Button>
            <Footer/>
        </Stack>
    )
};
export default TeamSetupPage;
