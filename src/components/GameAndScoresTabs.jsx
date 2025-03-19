import {useSelector} from "react-redux";
import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import ScoresTab from "../components/ScoresTab";
import Button from "@mui/material/Button";

import GameTab from "../components/GameTab";
import {setCurrentGameTab} from "../redux/gameSlice";
import useTranslationAndDispatch from "../hooks/useTranslationAndDispatch";

const GameAndScoresTabs = ({
                               gameTab = <GameTab/>
                           }) => {

    const {roundInProgress, currentGameTab} = useSelector(state => state.game);

    const {dispatch, t} = useTranslationAndDispatch();

    const tabStyles = {
        base: {
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '100px'
        },
        active: {
            backgroundColor: "#F0F0F0",
            color: "#6B6B6B"
        },
        inactive: {
            borderColor: '#D1D1D1',
            backgroundColor: "#000000",
            color: "#FFFFFF"
        }
    };

    const handleTabChange = (tab) => {
        if (!roundInProgress) {
            dispatch(setCurrentGameTab(tab));
        }
    };

    return (
        <>
            <ButtonGroup
                sx={{
                    height: '58px',
                    opacity: roundInProgress ? '40%' : '100%',
                    mt: 2,
                    mb: 3
                }}
                fullWidth
            >
                <Button
                    sx={{
                        ...tabStyles.base,
                        ...(currentGameTab === 'game' ? tabStyles.active : tabStyles.inactive)
                    }}
                    onClick={() => handleTabChange('team')}
                >
                    {t('team')}
                </Button>
                <Button
                    sx={{
                        ...tabStyles.base,
                        ...(currentGameTab === 'team' ? tabStyles.active : tabStyles.inactive)
                    }}
                    onClick={() => handleTabChange('game')}
                >
                    {t('game')}
                </Button>
            </ButtonGroup>
            {currentGameTab === 'game' && gameTab}
            {currentGameTab === 'team' && <ScoresTab/>}
        </>
    );
};
export default GameAndScoresTabs;
