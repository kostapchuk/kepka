import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import Stack from '@mui/material/Stack';
import {addPlayers} from "../redux/playersSlice";
import {randomIndex} from "../util/arrayUtils";
import TeamSetupHeader from "../components/TeamSetupHeader";
import TeamsAndPlayersList from "../components/TeamsAndPlayersList";
import {useEffect, useRef, useState} from "react";
import PrimaryButton from "../components/PrimaryButton";
import {Box} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

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

    const contentRef = useRef(null);
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);

    const checkContentOverflow = () => {
        if (contentRef.current) {
            const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
            setIsContentOverflowing(isOverflowing);
        }
    };

    useEffect(() => {
        checkContentOverflow();
        window.addEventListener('resize', checkContentOverflow);
        return () => window.removeEventListener('resize', checkContentOverflow);
    }, [teams]);

    const [tooltipOpen, setTooltipOpen] = useState(false);
    return (
        <>
            <Stack sx={{
                marginBottom: '80px',
                maxHeight: 'calc(100vh - 80px)'
            }} ref={contentRef}>
                <TeamSetupHeader/>
                <TeamsAndPlayersList
                    teamError={teamError}
                    playerError={playerError}
                    commonErrors={commonErrors}
                />
            </Stack>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    padding: '16px',
                    borderTop: isContentOverflowing ? '1px solid #D1D1D1' : 'none'
                }}
            >
                <Tooltip
                    title="Скоро"
                    arrow
                    open={tooltipOpen}
                    onClose={() => setTooltipOpen(false)}
                >
                    <img src="/random-arrows.svg" onClick={() => setTooltipOpen(true)} alt="Generate teams" style={{
                        backgroundColor: '#f0f0f0',
                        padding: '12px',
                        borderRadius: '12px',
                        marginRight: '12px'
                    }}/>
                </Tooltip>
                <PrimaryButton onClick={goToNextPage} content="Продолжить"/>
            </Box>
        </>
    )
};
export default TeamSetupPage;
