import React from 'react';
import BaseModal from "@/components/ui/modal/BaseModal";
import {setTourChangeModalOpen} from "@/redux/gameSlice";
import {useDispatch, useSelector} from "react-redux";

const TimeLeftInRoundModal = ({doFinishRound}) => {

    const dispatch = useDispatch();

    const {
        tourChangeModalOpen,
        actualLeftTimeInTour
    } = useSelector(state => state.game);

    const handlePrimaryAction = () => {
        dispatch(setTourChangeModalOpen(false))
        doFinishRound(true)
    };

    const handleSecondaryAction = () => {
        dispatch(setTourChangeModalOpen(false))
        doFinishRound(false)
    };


    return (
        <BaseModal
            open={tourChangeModalOpen}
            title={`Осталось ${actualLeftTimeInTour} секунд`}
            content={`Ваша команда закончила тур. У вас осталось ${actualLeftTimeInTour} секунд. Хотите перенести остаток на следующий раз или первыми начать новый раунд с этим временем?`}
            primaryButtonText="Играть сразу"
            secondaryButtonText="Перенести"
            onPrimaryAction={handlePrimaryAction}
            onSecondaryAction={handleSecondaryAction}
        />
    );
};

export default TimeLeftInRoundModal;
