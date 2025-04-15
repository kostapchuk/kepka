import {useState, useCallback} from "react";
import {useSelector} from "react-redux";

const useTeamValidation = () => {
  const {teams} = useSelector(state => state.game);
  const [teamError, setTeamError] = useState([]);
  const [playerError, setPlayerError] = useState([]);
  const [commonErrors, setCommonErrors] = useState([]);

  const resetErrors = () => {
    setTeamError([]);
    setPlayerError([]);
    setCommonErrors([]);
  };

  const validateTeamsCount = () => {
    if (teams.length < 2) {
      setCommonErrors(prev => [...prev, 'not-enough-teams-error']);
      return 1;
    }
    return 0;
  };

  const validateEachTeamHasPlayer = () => {
    const missingPlayers = teams.filter(t => t.players.length < 1);
    if (missingPlayers.length > 0) {
      setCommonErrors(prev => [...prev, 'not-enough-players-error']);
      return 1;
    }
    return 0;
  };

  const validateUniqueAndNonEmptyNames = () => {
    let errorCount = 0;
    const teamNames = new Set();

    teams.forEach((team, teamIndex) => {
      if (!team.name) {
        errorCount++;
        setTeamError(prev => [...prev, {error: teamIndex, helperText: "empty-team-name-error"}]);
      } else if (teamNames.has(team.name)) {
        errorCount++;
        setTeamError(prev => [...prev, {error: teamIndex, helperText: "existing-team-name-error"}]);
      } else {
        teamNames.add(team.name);
      }

      const playerNames = new Set();
      team.players.forEach((player, playerIndex) => {
        if (!player) {
          errorCount++;
          setPlayerError(prev => [...prev, {teamIndex, playerIndex, helperText: "empty-player-name-error"}]);
        } else if (playerNames.has(player)) {
          errorCount++;
          setPlayerError(prev => [...prev, {teamIndex, playerIndex, helperText: "existing-player-name-error"}]);
        } else {
          playerNames.add(player);
        }
      });
    });

    return errorCount;
  };

  const validateAll = useCallback(() => {
    resetErrors();
    let errors = 0;
    errors += validateTeamsCount();
    errors += validateEachTeamHasPlayer();
    errors += validateUniqueAndNonEmptyNames();
    return errors === 0;
  }, [teams]);
  return {teamError, playerError, commonErrors, validateAll, resetErrors};
};

export default useTeamValidation;
