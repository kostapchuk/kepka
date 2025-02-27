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
                    <FormControlLabel key={Math.random()} sx={{m: 0, p: 0}} control={<Checkbox
                        key={Math.random()}
                        checked={roundAnsweredWords.includes(option)}
                        onChange={() => {
                            if (roundAnsweredWords.includes(option)) {
                                dispatch(setRoundAnsweredWords(roundAnsweredWords.filter(word => word !== option)));
                            } else {
                                dispatch(setRoundAnsweredWords([...roundAnsweredWords, option]));
                            }
                        }}
                        checkedIcon={<img src="/checkbox-on.svg" alt="Checked" style={{ width: '28px', height: '28px' }} />}
                        icon={<img src="/checkbox-off.svg" alt="Unchecked" style={{ width: '28px', height: '28px' }} />}
                        sx={{
                            height: '48px',
                            '&.Mui-checked': {
                                color: '#7A51EC'
                            },
                        }}
                    />} label={
                        <Typography variant="body1" sx={{
                            fontSize: '20px',
                            fontWeight: '500'
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
