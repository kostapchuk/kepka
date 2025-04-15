import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from 'react';

import {Pages} from "../../routes";

const ScoresTab = () => {

    const {score, showScoreDuringGame} = useSelector(state => state.game);

    const currentPage = useSelector(state => state.page.currentPage);

    return (
        <>
            {Object.entries(score).map(([key, value], index) => (
                <Box sx={{display: 'flex', mb: 2.5}}>
                    <img src={`/cap-${index % 3}-v1.svg`} alt="Cap" style={{width: '50px', marginRight: '12px'}}/>
                    <Box>
                        <Typography sx={{fontSize: '16px'}}>{key}</Typography>
                        {(showScoreDuringGame || currentPage === Pages.RESULTS_PAGE) &&
                            <Typography sx={{fontSize: '14px', color: '#6B6B6B'}}>{value}</Typography>}
                    </Box>
                </Box>
            ))}
        </>
    )
}

export default ScoresTab
