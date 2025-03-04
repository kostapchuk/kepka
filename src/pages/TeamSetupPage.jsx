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

// todo: design
// todo: save to redux
// todo: separate components
// todo: players errors
// todo: team errors (when one exists and then delete previous team)
const TeamSetupPage = () => {
    const dispatch = useDispatch();
    const {currentGameId} = useSelector(state => state.game)
    const [playerNames, setPlayerNames] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [teamError, setTeamError] = useState([])
    const [playerError, setPlayerError] = useState([])
    const [newTeamError, setNewTeamError] = useState({error: false, helperText: ''});
    const [newPlayerError, setNewPlayerError] = useState({error: false, helperText: ''});

    const handlePlayerNameChange = (teamIndex, name) => {
        const updatedNames = [...playerNames];
        updatedNames[teamIndex] = name;
        setPlayerNames(updatedNames);
    };

    const handlePlayerBlur = (teamIndex, playerIndex) => {
        const allTrimmedNames = teams.flatMap(team => team.players.map(player => player.trim()));
        const allUniquePlayerNames = new Set(allTrimmedNames);

        setPlayerError(prevState => prevState.filter(error => !(error.teamIndex === teamIndex && error.playerIndex === playerIndex)));

        if (allTrimmedNames[playerIndex] === '') {
            setPlayerError(prevState => [
                ...prevState,
                {teamIndex, playerIndex, helperText: "Empty player name isn't allowed"}
            ]);
            return;
        }

        if (allUniquePlayerNames.size !== allTrimmedNames.length) {
            setPlayerError(prevState => [
                ...prevState,
                {teamIndex, playerIndex, helperText: "Player name already exists"}
            ]);
            return;
        }
    };

    const handleNewPlayerBlur = (teamIndex) => {
        const trimmedName = playerNames[teamIndex].trim();
        const allTrimmedNames = teams.flatMap(t => t.players.map(p => p.trim()))
        const allUniquePlayerNames = new Set(allTrimmedNames);
        if (trimmedName === '') {
            setNewPlayerError({})
            return;
        }
        if (allUniquePlayerNames.has(trimmedName)) {
            setNewPlayerError({error: true, helperText: "Player name already exists"})
            return;
        }

        setNewPlayerError({})
        const updatedTeams = [...teams];
        updatedTeams[teamIndex] = {
            ...updatedTeams[teamIndex],
            players: [...updatedTeams[teamIndex].players, playerNames[teamIndex]]
        };
        setTeams(updatedTeams);
        handlePlayerNameChange(teamIndex, '');
    }

    const handlePlayerNameChangeByIndex = (playerIndex, teamIndex, name) => {
        const updatedTeams = [...teams];
        const updatedPlayers = [...updatedTeams[teamIndex].players]
        updatedPlayers[playerIndex] = name
        updatedTeams[teamIndex] = {
            ...updatedTeams[teamIndex],
            players: updatedPlayers
        };
        setTeams(updatedTeams);
    };

    const handleTeamNameChange = (name) => {
        setTeamName(name);
    };

    const handleNewTeamBlur = () => {
        const trimmedName = teamName.trim();
        const allTeamNames = new Set(teams.map(t => t.name.trim()));
        if (trimmedName === '') {
            setNewTeamError({})
            return;
        }
        if (allTeamNames.has(trimmedName)) {
            setNewTeamError({error: true, helperText: "Team name already exists"})
            return;
        }
        setNewTeamError({})
        setTeams(prevState => [...prevState, {name: teamName, players: []}]);
        setTeamName('');
    }

    const handleTeamBlur = (teamIndex) => {
        const allTeamNames = teams.map(t => t.name.trim());
        const allUniqueTeamNames = new Set(allTeamNames);
        setTeamError(prevState => prevState.filter(error => error.error !== teamIndex));

        if (allUniqueTeamNames.has('')) {
            setTeamError(prevState => [
                ...prevState.filter(error => error.index !== teamIndex),
                {error: teamIndex, helperText: "Empty team name isn't allowed"}
            ]);
            return;
        }

        if (allUniqueTeamNames.size !== allTeamNames.length) {
            const existingError = teamError.find(error => error.index === teamIndex);
            if (!existingError) {
                setTeamError(prevState => [
                    ...prevState,
                    {error: teamIndex, helperText: "Team name already exists"}
                ]);
            }
            return;
        }
    };

    const handleTeamNameChangeByIndex = (index, name) => {
        const updatedTeams = [...teams];
        updatedTeams[index] = {...updatedTeams[index], name: name};
        setTeams(updatedTeams);
        setPlayerNames(prevState => [...prevState, ''])
    };

    const goToNextPage = () => {
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

    const areTeamsAndPlayersValid = () => {
        if (teams.length === 0) {
            return false
        }

        const eachTeamHasAtLeastOnePlayer = teams.filter(t => t.players.length < 1)
        if (eachTeamHasAtLeastOnePlayer.length > 0) {
            return false;
        }

        if (teamError.length > 0 || playerError.length > 0 || newPlayerError.error || newTeamError.error) {
            return false
        }
        return true;
    }

    const handleDeleteTeam = (teamIndexToDelete) => {
        setTeams([...teams].filter((team, teamIndex) => teamIndex !== teamIndexToDelete))
    }

    const handleDeletePlayer = (teamIndex, playerIndexToDelete) => {
        const updatedTeams = [...teams]
        const updatedTeam = {
            ...teams[teamIndex],
            players: teams[teamIndex].players.filter((player, playerIndex) => playerIndex !== playerIndexToDelete)
        }
        updatedTeams[teamIndex] = updatedTeam
        setTeams(updatedTeams)
    }

    return (
        <Stack spacing={2}>
            {teams.map((team, teamIndex) => (
                <>
                    <h3>Команда</h3>
                    <TeamInputBlock
                        teamName={team.name}
                        handleTeamBlur={handleTeamBlur}
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
                            handlePlayerBlur={handlePlayerBlur}
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
                        error={newPlayerError.error}
                        handleDeletePlayer={() => {
                        }}
                        newPlayer
                    />
                </>
            ))}
            <h3>Новая Команда</h3>
            <TeamInputBlock
                teamName={teamName}
                handleTeamBlur={handleTeamBlur}
                handleNewTeamBlur={handleNewTeamBlur}
                handleTeamNameChange={handleTeamNameChange}
                handleTeamNameChangeByIndex={() => {
                }}
                newTeam
                error={newTeamError}
                teamIndex={-1}
                handleDeleteTeam={() => {
                }}
            />
            <Button variant="contained" onClick={goToNextPage} disabled={!areTeamsAndPlayersValid()}>
                Продолжить
            </Button>
            <Footer/>
        </Stack>
    )
};
export default TeamSetupPage;
