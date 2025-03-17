import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";

import BaseModal from "../components/ui/modal/BaseModal";
import {setTourChangeModalOpen} from "../redux/gameSlice";

const ConfirmationTourChangeModal = () => {

    const {tourChangeModalOpen, score, showScoreDuringGame} = useSelector(state => state.game);

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(setTourChangeModalOpen(false));
    };

    return <BaseModal
        open={tourChangeModalOpen}
        title='Тур завершен'
        content={
            showScoreDuringGame &&
            Object.entries(score)
                .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
                .map(([team, score], index) => (
                    <Typography sx={{textAlign: 'left', pl: 1, pb: 1.5}}>{index + 1}) {team} - {score}</Typography>
                ))
        }
        onlyPrimary
        primaryButtonText='Следующий тур'
        onPrimaryAction={closeModal}
        onClose={() => {}}
        disableEscapeKeyDown
    />
};

export default ConfirmationTourChangeModal;
