import React from 'react';
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";

import BaseModal from "../components/ui/modal/BaseModal";
import {setTourChangeModalOpen} from "../redux/gameSlice";
import useTranslationAndDispatch from "../hooks/useTranslationAndDispatch";

const ConfirmationTourChangeModal = () => {

    const {tourChangeModalOpen, score, showScoreDuringGame} = useSelector(state => state.game);

    const {dispatch, t} = useTranslationAndDispatch();

    const closeModal = () => {
        dispatch(setTourChangeModalOpen(false));
    };

    return <BaseModal
        open={tourChangeModalOpen}
        title={t('tour-ended')}
        content={
            showScoreDuringGame &&
            Object.entries(score)
                .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
                .map(([team, score], index) => (
                    <Typography sx={{textAlign: 'left', pl: 1, pb: 1.5}}>{index + 1}) {team} - {score}</Typography>
                ))
        }
        onlyPrimary
        primaryButtonText={t('next-tour')}
        onPrimaryAction={closeModal}
        onClose={() => {
        }}
        disableEscapeKeyDown
    />
};

export default ConfirmationTourChangeModal;
