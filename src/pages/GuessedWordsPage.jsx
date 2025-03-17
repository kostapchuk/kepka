import GuessedWordsOptions from "../components/GuessedWordsOptions";
import FinishRoundButton from "../components/FinishRoundButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import React from 'react';
import Container from "@mui/material/Container";

const GuessedWordsPage = () => {
    const {roundAnsweredWords} = useSelector(state => state.game);

    const contentRef = useRef(null);
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);

    const checkContentOverflow = () => {
        if (contentRef.current) {
            const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
            setIsContentOverflowing(isOverflowing);
        }
    };

    useEffect(() => {
        checkContentOverflow();
        window.addEventListener('resize', checkContentOverflow);
        return () => window.removeEventListener('resize', checkContentOverflow);
    }, []);

    return (
        <Container sx={{mt: 2}} maxWidth="xs">
            <Stack sx={{
                marginBottom: '85px'
            }} ref={contentRef}>
                <Typography sx={{
                    padding: '16px 16px 8px 16px',
                    fontSize: '20px',
                    fontWeight: '600'
                }}>Счет: {roundAnsweredWords.length}</Typography>
                <Typography variant="p" sx={{fontSize: "14px", paddingLeft: '8px'}}>
                    Выберите угаданные слова
                </Typography>
                <GuessedWordsOptions/>
            </Stack>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#FFFFFF',
                    padding: '16px',
                    paddingBottom: '32px',
                    borderTop: isContentOverflowing ? '1px solid #D1D1D1' : 'none'
                }}
            >
                <FinishRoundButton/>
            </Box>
        </Container>
    );
}
export default GuessedWordsPage;
