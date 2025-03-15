import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "@/redux/pageSlice";
import {Pages} from "@/routes";
import {setLeftWords, setShowLeftWords, setWords, setWordsCount, setWordsDifficulty} from "@/redux/gameSlice";
import Box from "@mui/material/Box";
import React, {useRef, useState} from "react";
import PrimaryButton from "../components/PrimaryButton";
import {shuffle} from "@/util/arrayUtils";
import {wordsByDifficultyLevel} from "@/util/words";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {PurpleSwitcherNoLabel} from "@/components/Switcher";
import ScrollablePageWithStickyFooter from "@/components/ScrollablePageWithStickyFooter";

const WordsSetupPage = () => {

    const {wordsCount, showLeftWords, wordsDifficulty} = useSelector(state => state.game);
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const goToTourSetupPage = () => {
        const intDigits = /^[0-9]+$/;
        if (!intDigits.test(wordsCount)) {
            setError('Только положительные цифры разрешены');
            return;
        }
        const wordsCountNum = Number(wordsCount);
        if (wordsCountNum === 0 || wordsCountNum >= 100) {
            setError('Количество слов должно быть от 1 до 100');
            return;
        }
        setError('');
        const words = shuffle(wordsByDifficultyLevel[wordsDifficulty]).slice(0, wordsCount);
        dispatch(setWords(words))
        dispatch(setLeftWords(words))
        dispatch(setCurrentPage(Pages.TOUR_SETUP_PAGE));
    }

    const inputRef2 = useRef(null);

    const handleFocus2 = () => {
        inputRef2.current.focus();
    };

    const handleChange = (event) => {
        dispatch(setWordsDifficulty(event.target.value))
    };

    const onBackClick = () => {
        dispatch(setCurrentPage(Pages.TEAM_SETUP_PAGE));
    }
    const [open, setOpen] = useState(false);

    const handleChangeSwitcher = () => {
        dispatch(setShowLeftWords(!showLeftWords));
    };

    const handleWordsCountChange = (e) => {
        dispatch(setWordsCount(e.target.value));
    }

    const children = <>
        <Box sx={{display: "flex", mb: 1}}>
            <img src="/back.svg" alt="Back" onClick={onBackClick} style={{marginRight: '12px'}}/>
            <Typography variant="h3" sx={{fontSize: "24px", fontWeight: "600"}}>Настройка игры 2 / 3</Typography>
        </Box>
        <Typography sx={{fontSize: "14px", color: "#6B6B6B", mt: 3, mb: 0.5}}>
            Слов в игре
        </Typography>
        <TextField
            type="tel"
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
                width: '100%',
            }}
            error={error !== ''}
            helperText={error}
            value={wordsCount}
            onChange={handleWordsCountChange}
            onFocus={handleFocus2}
        />

        <Typography sx={{fontSize: "14px", color: "#6B6B6B", mt: 2.5, mb: 0.5}}>
            Сложность слов
        </Typography>
        <FormControl fullWidth>
            <Select
                value={wordsDifficulty}
                onChange={handleChange}
                IconComponent={() => <img src="/down.svg" alt="Drop down icon" style={{
                    width: 24,
                    height: 24,
                    marginRight: '12px',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                }}/>}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                variant="outlined" sx={{
                borderRadius: '12px',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D1D1D1'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7A51EC'
                }
            }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            borderRadius: '12px',
                            '& .MuiMenuItem-root.Mui-selected': {
                                backgroundColor: '#7A51EC33',
                                borderRadius: '12px',
                                margin: '0 10px'
                            }
                        }
                    }
                }}
            >
                <MenuItem sx={{height: 48, margin: '0 8px'}} value="EASY">Низкая</MenuItem>
                <MenuItem sx={{height: 48, margin: '0 8px'}} value="MEDIUM">Средняя</MenuItem>
                <MenuItem sx={{height: 48, margin: '0 8px'}} value="HARD">Сложная</MenuItem>
            </Select>
        </FormControl>
        <Box>
            <Typography sx={{fontSize: "14px", color: "#6B6B6B", mt: 2.5, mb: 0.5}}>
                Показывать количество оставшихся слов
            </Typography>
            <PurpleSwitcherNoLabel
                checked={showLeftWords}
                onChange={handleChangeSwitcher}
            />
        </Box>
    </>

    const footer = <PrimaryButton onClick={goToTourSetupPage} content="Продолжить"/>

    return (
        <ScrollablePageWithStickyFooter
            children={children}
            footer={footer}
        />
    );
};

export default WordsSetupPage;
