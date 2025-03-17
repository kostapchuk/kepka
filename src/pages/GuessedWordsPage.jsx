import GuessedWordsOptions from "../components/GuessedWordsOptions";
import FinishRoundButton from "../components/FinishRoundButton";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import React from "react";
import ScrollablePageWithStickyFooter from "../components/ScrollablePageWithStickyFooter";

const GuessedWordsPage = () => {
    const {roundAnsweredWords} = useSelector(state => state.game);

    const children = <>
        <Typography sx={{
            padding: '16px 16px 8px 16px',
            fontSize: '20px',
            fontWeight: '600'
        }}>Счет: {roundAnsweredWords.length}</Typography>
        <Typography variant="p" sx={{fontSize: "14px", paddingLeft: '8px'}}>
            Выберите угаданные слова
        </Typography>
        <GuessedWordsOptions/>
    </>;

    const footer = <FinishRoundButton/>;

    return (
        <ScrollablePageWithStickyFooter
            children={children}
            footer={footer}
        />
    );
}
export default GuessedWordsPage;
