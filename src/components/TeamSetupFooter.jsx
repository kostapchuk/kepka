import React from "react";
import Box from "@mui/material/Box";
import PrimaryButton from "./PrimaryButton";
import {setRandomizerModalOpen} from "../redux/gameSlice";
import {randomIndex} from "../util/arrayUtils";
import {addPlayers} from "../redux/playersSlice";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import useTranslationAndDispatch from "../hooks/useTranslationAndDispatch";
import {useSelector} from "react-redux";

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
        <PrimaryButton onClick={onContinue} content={t('continue')}/>
      </Box>
  );
};

export default TeamSetupFooter;
