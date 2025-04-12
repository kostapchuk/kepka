import React from "react";

import PrimaryButton from "../components/PrimaryButton";
import {setRestartGameModalOpen} from "../redux/gameSlice";
import ScrollablePageWithStickyFooter from "../components/ScrollablePageWithStickyFooter";
import ResultsTab from "../components/ResultsTab";
import GameAndScoresTabs from "../components/GameAndScoresTabs";
import useTranslationAndDispatch from "../hooks/useTranslationAndDispatch";
import Typography from "@mui/material/Typography";

const ResultsPage = () => {

    const {dispatch, t} = useTranslationAndDispatch()

    const openRestartGameModal = () => {
        dispatch(setRestartGameModalOpen(true));
    }

    return (
        <ScrollablePageWithStickyFooter
            footer={<PrimaryButton onClick={openRestartGameModal} content={t('start-again')}/>}
        >
          <Typography variant="h3" sx={{fontSize: "20px", fontWeight: "600"}}>
            {t('end-game')}
          </Typography>
          <GameAndScoresTabs gameTab={<ResultsTab/>}/>
        </ScrollablePageWithStickyFooter>
    )
}

export default ResultsPage;
