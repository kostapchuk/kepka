import TeamInputBlock from "./TeamInputBlock";
import PlayerInputBlock from "./PlayerInputBlock";
import {useSelector} from "react-redux";

const TeamsAndPlayersList = ({
                                 teamError,
                                 playerError,
                                 commonErrors
                             }) => {
    const {teams} = useSelector(state => state.game);

    return (
        <>
            {teams.map((team, teamIndex) => (
                <>
                    <TeamInputBlock
                        teamName={team.name}
                        error={teamError.find(error => error.error === teamIndex)}
                        teamIndex={teamIndex}
                    />
                    {team.players.map((player, playerIndex) => (
                        <PlayerInputBlock
                            teamIndex={teamIndex}
                            playerIndex={playerIndex}
                            player={player}
                            error={playerError.find(error => error.teamIndex === teamIndex && error.playerIndex === playerIndex)}
                        />
                    ))}
                    <PlayerInputBlock
                        teamIndex={teamIndex}
                        playerIndex={-1}
                        newPlayer
                    />
                </>
            ))}
            <TeamInputBlock newTeam teamIndex={-1}/>
            {commonErrors.map(error => <p>{error}</p>)}
        </>
    )
}

export default TeamsAndPlayersList;
