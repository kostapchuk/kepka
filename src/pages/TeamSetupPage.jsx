import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import Footer from "../components/Footer";
import {addPlayers} from "../redux/playersSlice";
import {randomIndex} from "../util/arrayUtils";

// todo: delete team/player
// todo: design
// todo: save to redux
const TeamSetupPage = () => {
    const dispatch = useDispatch();
    const {currentGameId} = useSelector(state => state.game)
    const [playerNames, setPlayerNames] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState('');

    const handlePlayerNameChange = (teamIndex, name) => {
        const updatedNames = [...playerNames];
        updatedNames[teamIndex] = name;
        setPlayerNames(updatedNames);
    };

    const handlePlayerBlur = (teamIndex) => {
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

    const handleTeamBlur = () => {
        setTeams(prevState => [...prevState, {name: teamName, players: []}]);
        setTeamName('');
    }

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

    const areTeamsValid = () => {
        if (teams.length === 0) {
            return false
        }
        const anyPlayerNameOrTeamNameEmpty = teams.filter(
            t => t.name.trim === '' || t.players.filter(p => p === '')
        )
        if (anyPlayerNameOrTeamNameEmpty > 0) {
            return false;
        }

        const allTeamNames = teams.flatMap(t => t.name)
        const teamNamesUnique = allTeamNames.length === new Set(allTeamNames).size
        if (!teamNamesUnique) {
            return false;
        }

        const eachTeamHasAtLeastOnePlayer = teams.filter(t => t.players.length < 1)
        if (eachTeamHasAtLeastOnePlayer.length > 0) {
            return false;
        }

        const allPlayers = teams.flatMap(t => t.players)
        const playerNamesUnique = allPlayers.length === new Set(allPlayers).size
        if (!playerNamesUnique) {
            return false;
        }

        return true;
    }

    return (
        <Stack spacing={2}>
            {teams.map((team, teamIndex) => (
                <>
                    <h3>Команда</h3>
                    <TextField
                        key={teamIndex}
                        value={team.name}
                        onChange={(e) => handleTeamNameChangeByIndex(teamIndex, e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                    {team.players.map((player, playerIndex) => (
                        <TextField
                            key={teamIndex + playerIndex}
                            value={player}
                            onChange={(e) => handlePlayerNameChangeByIndex(playerIndex, teamIndex, e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                    ))}
                    <TextField
                        key={teamIndex + 'emptyPlayerInputKey'}
                        label="Введите имя игрока"
                        value={playerNames[teamIndex]}
                        onChange={(e) => handlePlayerNameChange(teamIndex, e.target.value)}
                        variant="outlined"
                        onBlur={() => handlePlayerBlur(teamIndex)}
                        fullWidth
                    />
                </>
            ))}
            <h3>Новая Команда</h3>
            <TextField
                key="emptyTeamInputKey"
                label="Введите имя новой команды"
                value={teamName}
                onChange={(e) => handleTeamNameChange(e.target.value)}
                variant="outlined"
                onBlur={handleTeamBlur}
                fullWidth
            />
            <Button variant="contained" onClick={goToNextPage} disabled={!areTeamsValid()}>
                Продолжить
            </Button>
            <Footer/>
        </Stack>
    )
};
export default TeamSetupPage;
