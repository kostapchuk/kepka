import React from 'react';
import {useSelector} from "react-redux";

import BaseModal from "./ui/BaseModal";
import {reset as resetGame, setRestartGameModalOpen} from "../redux/gameSlice";
import {reset as resetPage} from "../redux/pageSlice";
import {reset as resetPlayers} from "../redux/playersSlice";
import {reset as resetStatistics} from "../redux/statisticsSlice";
import useTranslationAndDispatch from "../hooks/useTranslationAndDispatch";

const RestartGameModal = () => {

    const {restartGameModalOpen} = useSelector(state => state.game);

    const {dispatch, t} = useTranslationAndDispatch();

    const resetFullGame = () => {
        dispatch(resetGame());
        dispatch(resetPage());
        dispatch(resetPlayers());
        dispatch(resetStatistics());
    };

    const handleClose = () => dispatch(setRestartGameModalOpen(false))

    return (
        <BaseModal
            open={restartGameModalOpen}
            title={t('leave-game')}
            content={t('do-you-want-to-exit-game', {version: APPLICATION_VERSION})}
            secondaryButtonText={t('no')}
            primaryButtonText={t('yes')}
            onPrimaryAction={resetFullGame}
            onSecondaryAction={handleClose}
            onClose={handleClose}
        />
    );
};

export default RestartGameModal;
