import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Footer from "../components/Footer";
import {addPlayers} from "../redux/playersSlice";
import {randomIndex} from "../util/arrayUtils";
import LanguageSwitcher from "../components/LanguageSwitcher";
import TeamsAndPlayersList from "../components/TeamsAndPlayersList";
import {useState} from "react";

// todo: design
// todo: trim everything before save (not allow user to enter something with around spaces)
const TeamSetupPage = () => {
    const dispatch = useDispatch();
    const {currentGameId, teams} = useSelector(state => state.game);
    const [teamError, setTeamError] = useState([]);
    const [playerError, setPlayerError] = useState([]);
    const [commonErrors, setCommonErrors] = useState([]);

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

    return (
        <Stack spacing={2}>
            <LanguageSwitcher/>
            <TeamsAndPlayersList
                teamError={teamError}
                playerError={playerError}
                commonErrors={commonErrors}
            />
            <Button variant="contained" onClick={goToNextPage}>Продолжить</Button>
            <Footer/>
        </Stack>
    )
};
export default TeamSetupPage;
