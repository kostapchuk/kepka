import {Box, Checkbox, FormControlLabel, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setRoundAnsweredWords} from "../redux/gameSlice";

const GuessedWordsOptions = () => {
    const {roundWords, roundAnsweredWords} = useSelector(state => state.game);
    const dispatch = useDispatch();
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', mb: 2}}>
            {
                roundWords.map(option => (
                    <FormControlLabel key={Math.random()} sx={{margin: 0}} control={<Checkbox
                        key={Math.random()}
                        checked={roundAnsweredWords.includes(option)}
                        onChange={() => {
                            if (roundAnsweredWords.includes(option)) {
                                dispatch(setRoundAnsweredWords(roundAnsweredWords.filter(word => word !== option)));
                            } else {
                                dispatch(setRoundAnsweredWords([...roundAnsweredWords, option]));
                            }
                        }}
                        sx={{
                            '&.Mui-checked': {
                                transform: 'scale(1.5)',
                                color: '#7A51EC'
                            },
                            transform: 'scale(1.5)',
                            pb: '4px',
                            height: '48px'
                        }}
                    />}label={
                        <Typography variant="body1" sx={{
                            fontSize: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            height: '48px'
                        }}>
                            {option}
                        </Typography>
                    }
                    />
                ))
            }
        </Box>
    )
};

export default GuessedWordsOptions;
