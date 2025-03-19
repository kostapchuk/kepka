import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from 'react';

import {setRestartGameModalOpen} from "../redux/gameSlice";
import useTranslationAndDispatch from "../hooks/useTranslationAndDispatch";

4

const TOURS_MAPPING = {
    ALIAS: 'alias',
    CROCODILE: 'crocodile',
    ONE_WORD: 'one-word'
    // DRAWING: 'drawing',
}

const GameHeader = () => {

    const {
        tour,
        currentTeam,
        currentGameId,
        roundInProgress
    } = useSelector(state => state.game);

    const players = useSelector(state => state.players);

    const {dispatch, t} = useTranslationAndDispatch();

    return (
        <Box sx={{display: "flex", justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <Typography variant="h3" sx={{fontSize: "42px"}}
                            onClick={() => !roundInProgress && dispatch(setRestartGameModalOpen(true))}>
                    🚪
                </Typography>
                <Typography variant="h3" sx={{fontSize: "24px"}}>
                    {t('tour')}{" "}<Typography variant="" sx={{
                    fontSize: "24px",
                    fontWeight: '600'
                }}>{t(TOURS_MAPPING[tour])}</Typography>
                </Typography>
            </Box>
            <Box>
                <Typography>{t('asker')}</Typography>
                <Typography>{players.filter(
                    p => p.gameId === currentGameId && p.teamId === currentTeam
                        && p.asker)[0].name} ({currentTeam})</Typography>
            </Box>
        </Box>
    );
}

export default GameHeader;
