import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from 'react';

import {setRoundAnsweredWords} from "../redux/gameSlice";

const GuessedWordsOptions = () => {
    const {roundWords, roundAnsweredWords} = useSelector(state => state.game);

    const dispatch = useDispatch();

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', mb: 2, mt: 2}}>
            {
                [...roundWords].reverse().map((option, index) => (
                    <FormControlLabel key={index} sx={{m: 0, p: 0, mb: 2.5}} control={<Checkbox
                        key={index}
                        checked={roundAnsweredWords.includes(option)}
                        onChange={() => {
                            if (roundAnsweredWords.includes(option)) {
                                dispatch(setRoundAnsweredWords(roundAnsweredWords.filter(word => word !== option)));
                            } else {
                                dispatch(setRoundAnsweredWords([...roundAnsweredWords, option]));
                            }
                        }}
                        checkedIcon={<img src="/checkbox-on.svg" alt="Checked" style={{ width: '34px', height: '34px' }} />}
                        icon={<img src="/checkbox-off.svg" alt="Unchecked" style={{ width: '34px', height: '34px' }} />}
                        sx={{
                            height: '36px',
                            '&.Mui-checked': {
                                color: '#7A51EC'
                            },
                        }}
                    />} label={<Typography variant="body1" sx={{fontSize: '28px'}}>{option}</Typography>}
                    />
                ))
            }
        </Box>
    )
};

export default GuessedWordsOptions;
