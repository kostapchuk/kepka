import React from "react";
import {useSelector} from "react-redux";
import {Stack} from "@mui/material";

import PrimaryButton from "../shared/PrimaryButton";
import {setRandomizerModalOpen} from "../../redux/gameSlice";
import {randomIndex} from "../../util/arrayUtils";
import {addPlayers} from "../../redux/playersSlice";
import {setCurrentPage} from "../../redux/pageSlice";
import {Pages} from "../../routes";
import useTranslationAndDispatch from "../../hooks/useTranslationAndDispatch";

const TeamSetupFooter = ({validateAll}) => {
  const {t, dispatch} = useTranslationAndDispatch();
  const {currentGameId, teams} = useSelector(state => state.game);

  const onContinue = () => {
    if (!validateAll()) {
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
