import React from 'react';
import BaseModal from "@/components/ui/modal/BaseModal";
import {reset as resetGame, setRestartGameModalOpen} from "@/redux/gameSlice";
import {useDispatch, useSelector} from "react-redux";
import {reset as resetPage} from "@/redux/pageSlice";
import {reset as resetPlayers} from "@/redux/playersSlice";

const RestartGameModal = () => {

    const {restartGameModalOpen} = useSelector(state => state.game);
    const dispatch = useDispatch();

    const resetFullGame = () => {
        dispatch(resetGame());
        dispatch(resetPage());
        dispatch(resetPlayers());
    };

    const handleClose = () => dispatch(setRestartGameModalOpen(false))

    return (
        <BaseModal
            open={restartGameModalOpen}
            title={`Выход из игры`}
            content={`Вы действительно хотите выйти из игры? Версия приложения v${APPLICATION_VERSION}`}
            secondaryButtonText={`Нет`}
            primaryButtonText={`Да`}
            onPrimaryAction={resetFullGame}
            onSecondaryAction={handleClose}
            onClose={handleClose}
        />
    );
};

export default RestartGameModal;
