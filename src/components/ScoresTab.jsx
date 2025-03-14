import {useSelector} from "react-redux";
import {Box, Typography} from "@mui/material";

const ScoresTab = () => {

    const {score, showScoreDuringGame} = useSelector(state => state.game);

    const hideScore = false

    return (
        <>
            {!hideScore && Object.entries(score).map(([key, value]) => (
                <Box sx={{display: 'flex', marginBottom: '20px'}}>
                    <img src="/cap.svg" alt="Cap" style={{width: '50px', marginRight: '12px'}}/>
                    <Box>
                        <Typography sx={{fontSize: '16px'}}>{key}</Typography>
                        {showScoreDuringGame && <Typography sx={{fontSize: '14px', color: '#6B6B6B'}}>{value}</Typography>}
                    </Box>
                </Box>
            ))}
        </>
    )
}

export default ScoresTab
