import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import useTranslationAndDispatch from "../../hooks/useTranslationAndDispatch";
import {setTourChangeModalOpen} from "../../redux/gameSlice";
import Typography from "@mui/material/Typography";
import BaseModal from "../shared/BaseModal";

const TourChangeModal = () => {
    const { tourChangeModalOpen, score, showScoreDuringGame } = useSelector((state) => state.game);
    const { dispatch, t } = useTranslationAndDispatch();

    const handleCloseModal = useCallback(() => {
        dispatch(setTourChangeModalOpen(false));
    }, [dispatch]);

    const renderScoreList = () => {
        if (!showScoreDuringGame) return null;

        return Object.entries(score)
            .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
            .map(([team, teamScore], index) => (
                <Typography key={team} sx={{ textAlign: 'left', pl: 1, pb: 1.5 }}>
                    {index + 1}) {team} - {teamScore}
                </Typography>
            ));
    };

    return (
        <BaseModal
            open={tourChangeModalOpen}
            title={t('tour-ended')}
            content={renderScoreList()}
            onlyPrimary
            primaryButtonText={t('next-tour')}
            onPrimaryAction={handleCloseModal}
            onClose={handleCloseModal}
            disableEscapeKeyDown
        />
    );
};

export default TourChangeModal;

