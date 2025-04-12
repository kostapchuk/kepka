import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  setLeftWords,
  setShowLeftWords,
  setWords,
  setWordsCount,
  setWordsDifficulty
} from "../redux/gameSlice";
import { Pages } from "../routes";
import { shuffle } from "../util/arrayUtils";
import { wordsByDifficultyLevel } from "../util/words";
import PrimaryButton from "../components/PrimaryButton";
import ScrollablePageWithStickyFooter from "../components/ScrollablePageWithStickyFooter";
import ToggleSwitch from "../components/ToggleSwitch";
import DifficultySelector from "../components/DifficultySelector";
import WordCountInput from "../components/WordCountInput";
import Header from "../components/Header";
import {setCurrentPage} from "../redux/pageSlice";

const DIFFICULTY_OPTIONS = [
  { value: "EASY", label: "easy" },
  { value: "MEDIUM", label: "medium" },
  { value: "HARD", label: "hard" }
];

const WordsSetupPage = () => {
  const dispatch = useDispatch();
  const { wordsCount, showLeftWords, wordsDifficulty } = useSelector(state => state.game);
  const { i18n, t } = useTranslation();
  const [error, setError] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);

  const validateWordsCount = () => {
    const isValid = /^[0-9]+$/.test(wordsCount) && wordsCount > 0 && wordsCount < 100;
    if (!isValid) {
      setError(t('words-count-per-round'));
      return false;
    }
    setError('');
    return true;
  };

  const handleContinue = () => {
    if (!validateWordsCount()) return;
    const words = shuffle(wordsByDifficultyLevel[i18n.language][wordsDifficulty]).slice(0, wordsCount);
    dispatch(setWords(words));
    dispatch(setLeftWords(words));
    dispatch(setCurrentPage(Pages.TOUR_SETUP_PAGE));
  };

  return (
      <ScrollablePageWithStickyFooter
          footer={<PrimaryButton onClick={handleContinue} content={t("continue")} />}
      >
        <Header onBackClick={() => dispatch(setCurrentPage(Pages.TEAM_SETUP_PAGE))} title={`${t("game-settings")} 2 / 3`} />
        <WordCountInput
            value={wordsCount}
            onChange={e => dispatch(setWordsCount(e.target.value))}
            error={error}
            label={t("words-in-game")}
        />
        <DifficultySelector
            value={wordsDifficulty}
            onChange={e => dispatch(setWordsDifficulty(e.target.value))}
            open={selectOpen}
            setOpen={setSelectOpen}
            options={DIFFICULTY_OPTIONS}
            label={t("words-difficulty")}
        />
        <ToggleSwitch
            checked={showLeftWords}
            onChange={() => dispatch(setShowLeftWords(!showLeftWords))}
            label={t("show-left-words")}
        />
      </ScrollablePageWithStickyFooter>
  );
};

export default WordsSetupPage;
