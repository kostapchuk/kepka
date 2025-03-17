import {useDispatch} from "react-redux";
import React from "react";

import PrimaryButton from "../components/PrimaryButton";
import {setRestartGameModalOpen} from "../redux/gameSlice";
import ScrollablePageWithStickyFooter from "../components/ScrollablePageWithStickyFooter";
import ResultsTab from "../components/ResultsTab";
import GameAndScoresTabs from "../components/GameAndScoresTabs";

const ResultsPage = () => {

    const dispatch = useDispatch();

    const openRestartGameModal = () => {
        dispatch(setRestartGameModalOpen(true));
    }

    return (
        <ScrollablePageWithStickyFooter
            children={<GameAndScoresTabs gameTab={<ResultsTab/>}/>}
            footer={<PrimaryButton onClick={openRestartGameModal} content="Начать заново"/>}
        />
    )
}

export default ResultsPage;
