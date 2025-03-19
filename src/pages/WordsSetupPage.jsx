import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import { setCurrentPage } from "../redux/pageSlice";
import { setLeftWords, setShowLeftWords, setWords, setWordsCount, setWordsDifficulty } from "../redux/gameSlice";
import { Pages } from "../routes";
import { shuffle } from "../util/arrayUtils";
import { wordsByDifficultyLevel } from "../util/words";
import PrimaryButton from "../components/PrimaryButton";
import { PurpleSwitcherNoLabel } from "../components/Switcher";
import ScrollablePageWithStickyFooter from "../components/ScrollablePageWithStickyFooter";
import {useTranslation} from "react-i18next";

const DIFFICULTY_OPTIONS = [
    { value: "EASY", label: "Низкая" },
    { value: "MEDIUM", label: "Средняя" },
    { value: "HARD", label: "Сложная" }
];

const DIFFICULTY_OPTIONS = [
    { value: "EASY", label: "Низкая" },
    { value: "MEDIUM", label: "Средняя" },
    { value: "HARD", label: "Сложная" }
];

const WordsSetupPage = () => {
    const { wordsCount, showLeftWords, wordsDifficulty } = useSelector(state => state.game);
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [selectOpen, setSelectOpen] = useState(false);
    const inputRef = useRef(null);
    const { i18n } = useTranslation();

    const validateWordsCount = () => {
        const intDigits = /^[0-9]+$/;
        if (!intDigits.test(wordsCount)) {
            setError('Только положительные цифры разрешены');
            return false;
        }

        const wordsCountNum = Number(wordsCount);
        if (wordsCountNum === 0 || wordsCountNum >= 100) {
            setError('Количество слов должно быть от 1 до 100');
            return false;
        }

        setError('');
        return true;
    };

    const goToTourSetupPage = () => {
        if (!validateWordsCount()) return;

        const words = shuffle(wordsByDifficultyLevel[i18n.language][wordsDifficulty]).slice(0, wordsCount);
        dispatch(setWords(words));
        dispatch(setLeftWords(words));
        dispatch(setCurrentPage(Pages.TOUR_SETUP_PAGE));
    };

    const handleFocus = () => {
        inputRef.current.focus();
    };

    const handleDifficultyChange = (event) => {
        dispatch(setWordsDifficulty(event.target.value));
    };

    const handleNavigateBack = () => {
        dispatch(setCurrentPage(Pages.TEAM_SETUP_PAGE));
    };

    const handleShowLeftWordsToggle = () => {
        dispatch(setShowLeftWords(!showLeftWords));
    };

    const handleWordsCountChange = (e) => {
        dispatch(setWordsCount(e.target.value));
    };

    const renderContent = () => (
        <>
            <Box sx={{ display: "flex", mb: 1 }}>
                <img
                    src="/back.svg"
                    alt="Back"
                    onClick={handleNavigateBack}
                    style={{ marginRight: '12px' }}
                />
                <Typography variant="h3" sx={{ fontSize: "24px", fontWeight: "600" }}>
                    Настройка игры 2 / 3
                </Typography>
            </Box>
            <Typography sx={{ fontSize: "14px", color: "#6B6B6B", mt: 3, mb: 0.5 }}>
                Слов в игре
            </Typography>
            <TextField
                type="tel"
                inputRef={inputRef}
                sx={{
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '& fieldset': { borderColor: '#D1D1D1' },
                        '&:hover fieldset': { borderColor: '#D1D1D1' },
                        '&.Mui-focused fieldset': { borderColor: '#7A51EC' }
                    },
                    '&:focus': { backgroundColor: 'transparent' },
                    width: '100%',
                }}
                error={error !== ''}
                helperText={error}
                value={wordsCount}
                onChange={handleWordsCountChange}
                onFocus={handleFocus}
            />
            <Typography sx={{ fontSize: "14px", color: "#6B6B6B", mt: 2.5, mb: 0.5 }}>
                Сложность слов
            </Typography>
            <FormControl fullWidth>
                <Select
                    value={wordsDifficulty}
                    onChange={handleDifficultyChange}
                    IconComponent={() => (
                        <img
                            src="/down.svg"
                            alt="Drop down icon"
                            style={{
                                width: 24,
                                height: 24,
                                marginRight: '12px',
                                transform: selectOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease'
                            }}
                        />
                    )}
                    onOpen={() => setSelectOpen(true)}
                    onClose={() => setSelectOpen(false)}
                    variant="outlined"
                    sx={{
                        borderRadius: '12px',
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1D1D1' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7A51EC' }
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
                    {DIFFICULTY_OPTIONS.map(option => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            sx={{ height: 48, margin: '0 8px' }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box>
                <Typography sx={{ fontSize: "14px", color: "#6B6B6B", mt: 2.5, mb: 0.5 }}>
                    Показывать количество оставшихся слов
                </Typography>
                <PurpleSwitcherNoLabel
                    checked={showLeftWords}
                    onChange={handleShowLeftWordsToggle}
                />
            </Box>
        </>
    );

    return (
        <ScrollablePageWithStickyFooter
            children={renderContent()}
            footer={<PrimaryButton onClick={goToTourSetupPage} content="Продолжить" />}
        />
    );
};

export default WordsSetupPage;
