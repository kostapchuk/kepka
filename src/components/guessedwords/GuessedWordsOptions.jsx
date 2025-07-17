import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import React from 'react';

import {setRoundAnsweredWords} from "../../redux/gameSlice";

const GuessedWordsOptions = () => {
    const {roundWords, roundAnsweredWords} = useSelector(state => state.game);

    const dispatch = useDispatch();

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', my: 2, gap: 2.5}}>
            {
                [...roundWords].reverse().map((option, index) => (
                    <FormControlLabel key={index} sx={{m: 0, p: 0}} control={<Checkbox
                        key={index}
                        checked={roundAnsweredWords.includes(option)}
                        onChange={() => {
                            if (roundAnsweredWords.includes(option)) {
                                dispatch(setRoundAnsweredWords(roundAnsweredWords.filter(word => word !== option)));
                            } else {
                                dispatch(setRoundAnsweredWords([...roundAnsweredWords, option]));
                            }
                        }}
                        sx={{
                            padding: 0,
                            '& .MuiSvgIcon-root': {
                                width: 34,
                                height: 34
                            },
                            '&.Mui-checked': {
                                color: '#7A51EC'
                            },
                        }}
                    />} label={<Typography variant="body1" sx={{fontSize: '28px', ml: 1.5}}>{option}</Typography>}
                    />
                ))
            }
        </Box>
    );
};

export default GuessedWordsOptions;
