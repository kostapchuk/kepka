import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Stack} from "@mui/material";

import PrimaryButton from "../shared/PrimaryButton";
import {
  addPlayerError,
  addTeamError, setPlayerErrors,
  setRandomizerModalOpen, setTeamErrors
} from "../../redux/gameSlice";
import {randomIndex} from "../../util/arrayUtils";
import {addPlayers} from "../../redux/playersSlice";
import {setCurrentPage} from "../../redux/pageSlice";
import {Pages} from "../../routes";
import useTranslationAndDispatch from "../../hooks/useTranslationAndDispatch";
import toast from "react-hot-toast";

const TeamSetupFooter = () => {
  const {t, dispatch} = useTranslationAndDispatch();
  const {currentGameId, teams} = useSelector(state => state.game);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    errors.forEach(error => toast.error(t(error)));
  }, [errors]);

  const validateAll = () => {
    const newErrors = [];
    if (teams.length < 2) {
      newErrors.push('not-enough-teams-error');
    }
    const missingPlayers = teams.filter(t => t.players.length < 1);
    if (missingPlayers.length > 0) {
      newErrors.push('not-enough-players-error');
    }
    return newErrors;
  };

  const validateUniqueAndNonEmptyNames = () => {
    const teamNames = new Set();
    let errorsCount = 0;
    teams.forEach((team, teamIndex) => {
      if (!team.name) {
        errorsCount++;
        dispatch(addTeamError({error: teamIndex, helperText: "empty-team-name-error"}));
      } else if (teamNames.has(team.name)) {
        errorsCount++;
        dispatch(addTeamError({error: teamIndex, helperText: "existing-team-name-error"}));
      } else {
        teamNames.add(team.name);
      }

      const playerNames = new Set();
      team.players.forEach((player, playerIndex) => {
        if (!player) {
          errorsCount++;
          dispatch(addPlayerError({teamIndex, playerIndex, helperText: "empty-player-name-error"}));
        } else if (playerNames.has(player)) {
          errorsCount++;
          dispatch(addPlayerError({teamIndex, playerIndex, helperText: "existing-player-name-error"}));
        } else {
          playerNames.add(player);
        }
      });
    });
    return errorsCount;
  };

  const onContinue = () => {
    setErrors([]);
    const validationErrors = validateAll();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(setTeamErrors([]));
    dispatch(setPlayerErrors([]));
    const inputErrors = validateUniqueAndNonEmptyNames();
    if (inputErrors > 0) {
      return;
    }
    teams.forEach(team => {
      const askerIndex = randomIndex(team.players);
      const players = team.players.map((name, index) => ({
        name,
        asker: index === askerIndex,
        teamId: team.name,
        gameId: currentGameId,
      }));
      dispatch(addPlayers(players));
    });
    dispatch(setCurrentPage(Pages.WORDS_SETUP_PAGE));
  };

  return (
      <Stack direction="row" spacing={1.5}>
        <img
            src="/random-arrows.svg"
            onClick={() => dispatch(setRandomizerModalOpen(true))}
            alt="Generate teams"
            style={{
              backgroundColor: '#F0F0F0',
              padding: '12px',
              borderRadius: '12px'
            }}
        />
        <PrimaryButton
            dataCy="team-page-continue-btn"
            onClick={onContinue}
            content={t('continue')}
        />
      </Stack>
  );
};

export default TeamSetupFooter;