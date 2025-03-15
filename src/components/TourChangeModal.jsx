import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import BaseModal from "@/components/ui/modal/BaseModal";
import {setTourChangeModalOpen} from "@/redux/gameSlice";

const ConfirmationTourChangeModal = () => {

    const {tourChangeModalOpen, score, showScoreDuringGame} = useSelector(state => state.game);

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(setTourChangeModalOpen(false));
    };

    return <BaseModal
        open={tourChangeModalOpen}
        title={`Тур завершен`}
        content={
            showScoreDuringGame &&
            Object.entries(score).map(([team, score]) => (
                <p key={Math.random()}>{team}: {score}</p>
            ))
        }
        onlyPrimary
        primaryButtonText={`Следующий тур`}
        onPrimaryAction={closeModal}
        onClose={() => {}}
        disableEscapeKeyDown
    />
};

export default ConfirmationTourChangeModal;
