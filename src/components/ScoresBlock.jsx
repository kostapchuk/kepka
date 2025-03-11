import {useSelector} from "react-redux";
import {Box, Typography} from "@mui/material";

const ScoresBlock = () => {

    const {
        leftWords,
        score
    } = useSelector(state => state.game);

    const hideScore = false
    const hideWordsLeft = false

    return (
        <>
            {!hideScore && Object.entries(score).map(([key, value]) => (
                <Box sx={{display: 'flex', marginBottom: '20px'}}>
                    <img src="/cap.svg" alt="Cap" style={{width: '50px', marginRight: '12px'}}/>
                    <Box>
                        <Typography sx={{fontSize: '16px'}}>{key}</Typography>
                        <Typography sx={{fontSize: '14px', color: '#6B6B6B'}}>{value}</Typography>
                    </Box>
                </Box>
            ))}
            {!hideWordsLeft && <p>Осталось слов: {leftWords.length}</p>}
        </>
    )
}

export default ScoresBlock
