import React from 'react';
import {useSelector} from "react-redux";

import BaseModal from "./ui/BaseModal";
import {setTourChangeModalOpen} from "../redux/gameSlice";
import useTranslationAndDispatch from "../hooks/useTranslationAndDispatch";

const TimeLeftInRoundModal = ({doFinishRound}) => {

    const {dispatch, t} = useTranslationAndDispatch();

    const {
        tourChangeModalOpen,
        actualLeftTimeInTour
    } = useSelector(state => state.game);

    const startWithLeftTime = () => {
        dispatch(setTourChangeModalOpen(false));
        doFinishRound(true);
    }

    const postponeWithLeftTime = () => {
        dispatch(setTourChangeModalOpen(false));
        doFinishRound(false);
    }

    return (
        <BaseModal
            open={tourChangeModalOpen}
            title={t('left-seconds', {actualLeftTimeInTour: actualLeftTimeInTour})}
            content={t('left-seconds-content', {actualLeftTimeInTour: actualLeftTimeInTour} )}
            primaryButtonText={t('play-now')}
            secondaryButtonText={t('postpone')}
            onPrimaryAction={startWithLeftTime}
            onSecondaryAction={postponeWithLeftTime}
        />
    );
};

export default TimeLeftInRoundModal;
