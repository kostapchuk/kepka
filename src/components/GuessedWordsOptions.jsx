import {Box, Checkbox, FormControlLabel, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setRoundAnsweredWords} from "../redux/gameSlice";

const GuessedWordsOptions = () => {
    const {roundWords, roundAnsweredWords} = useSelector(state => state.game);
    const dispatch = useDispatch();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {
                roundWords.map(option => (
                    <FormControlLabel key={Math.random()} control={<Checkbox
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
                            '&.Mui-checked': {transform: 'scale(1.5)'},
                            transform: 'scale(1.5)',
                            padding: '10px'
                        }}
                    />} label={
                        <Typography variant="body1" style={{fontSize: '25px'}}>
                            {option}
                        </Typography>
                    }/>
                ))
            }
        </Box>
    )
};

export default GuessedWordsOptions;
