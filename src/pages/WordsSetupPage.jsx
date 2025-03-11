import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import {setWordsCount} from "../redux/gameSlice";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {FormControl, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useRef, useState} from "react";
import Footer from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";

const WordsSetupPage = () => {

    const {timer, wordsCount, currentGameId} = useSelector(state => state.game);
    const dispatch = useDispatch();
    const players = useSelector(state => state.players);

    const goToTourSetupPage = () => {
        dispatch(setCurrentPage(Pages.TOUR_SETUP_PAGE));
    }

    const inputRef2 = useRef(null);

    const handleFocus2 = () => {
        inputRef2.current.focus();
    };

    const [selectedValue, setSelectedValue] = useState('10');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <Stack spacing={0}>
            // back arrow
            <Typography variant="h3" sx={{fontSize: "24px", fontWeight: "600"}}>Настройка игры 2 / 3</Typography>
            <Typography sx={{fontSize: "14px", color: "#6B6B6B", fontWeight: "500"}}>Слов в игре</Typography>
            <TextField
                inputRef={inputRef2}
                sx={{
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '& fieldset': {
                            borderColor: '#D1D1D1'
                        },
                        '&:hover fieldset': {
                            borderColor: '#D1D1D1'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#7A51EC'
                        }
                    },
                    '&:focus': {
                        backgroundColor: 'transparent'
                    },
                    flex: 1,
                    minWidth: '50px',
                    marginBottom: '16px'
                }}
                value={wordsCount}
                onChange={(e) => dispatch(setWordsCount(e.target.value))}
                onFocus={handleFocus2}
            />

            <Typography sx={{fontSize: "14px", color: "#6B6B6B", fontWeight: "500"}}>Сложность слов</Typography>
            <FormControl fullWidth>
                <Select
                    value={selectedValue}
                    onChange={handleChange}
                    variant="outlined" sx={{
                    borderRadius: '12px',
                    '& .MuiSelect-select': {
                        borderRadius: '12px',
                        '&:focus': {
                            backgroundColor: 'transparent'
                        }
                    },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '& fieldset': {
                            borderColor: '#D1D1D1'
                        },
                        '&:hover fieldset': {
                            borderColor: '#D1D1D1'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#7A51EC'
                        }
                    }
                }}>
                    <MenuItem value={10}>Низкая</MenuItem>
                    <MenuItem value={20}>Средняя</MenuItem>
                    <MenuItem value={30}>Сложная</MenuItem>
                </Select>
            </FormControl>
            <PrimaryButton onClick={goToTourSetupPage} content="Продолжить"/>
        </Stack>
    );
};

export default WordsSetupPage;
