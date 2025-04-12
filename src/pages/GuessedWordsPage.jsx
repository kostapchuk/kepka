import GuessedWordsOptions from "../components/GuessedWordsOptions";
import FinishRoundButton from "../components/FinishRoundButton";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import React from "react";
import ScrollablePageWithStickyFooter from "../components/ScrollablePageWithStickyFooter";
import {useTranslation} from "react-i18next";

const GuessedWordsPage = () => {
    const {roundAnsweredWords} = useSelector(state => state.game);
    const {t} = useTranslation();

    const footer = <FinishRoundButton/>;

    return (
        <ScrollablePageWithStickyFooter footer={footer}>
            <Typography sx={{
                padding: '16px 16px 8px 8px',
                fontSize: '20px',
                fontWeight: '600'
            }}>{t('score')}: {roundAnsweredWords.length}</Typography>
            <Typography variant="p" sx={{fontSize: '18px',paddingLeft: '8px'}}>
                {t('choose-guessed-words')}
            </Typography>
            <GuessedWordsOptions/>
        </ScrollablePageWithStickyFooter>
    );
}
export default GuessedWordsPage;
