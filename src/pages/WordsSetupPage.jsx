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
import PrimaryButton from "../components/shared/PrimaryButton";
import ScrollablePageWithStickyFooter from "../components/shared/ScrollablePageWithStickyFooter";
import DifficultySelector from "../components/wordssetup/DifficultySelector";
import WordCountInput from "../components/wordssetup/WordCountInput";
import SetupHeader from "../components/shared/SetupHeader";
import {setCurrentPage} from "../redux/pageSlice";
import {DIFFICULTY_LEVELS} from "../types/difficultyLevels";
import {Stack} from "@mui/material";
import LabeledInput from "@/components/shared/LabeledInput";
import Toggler from "@/components/shared/Toggler";

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
          footer={<PrimaryButton dataCy="words-page-continue-btn" onClick={handleContinue} content={t("continue")} />}
      >
        <Stack gap={3}>
          <SetupHeader onBackClick={() => dispatch(setCurrentPage(Pages.TEAM_SETUP_PAGE))} title={`${t("game-settings")} 2 / 3`} />
          <Stack gap={2.5}>
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
                options={DIFFICULTY_LEVELS}
                label={t("words-difficulty")}
            />
            <LabeledInput label={t("show-left-words")}>
              <Toggler
                  dataCy="show-remaining-words-toggler"
                  checked={showLeftWords}
                  onChange={() => dispatch(setShowLeftWords(!showLeftWords))}
              />
            </LabeledInput>
          </Stack>
        </Stack>
      </ScrollablePageWithStickyFooter>
  );
};

export default WordsSetupPage;
