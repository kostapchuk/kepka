import GuessedWordsOptions from "./GuessedWordsOptions";
import FinishRoundButton from "./FinishRoundButton";
import {Box, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";

const GuessedWordsModal = ({setCurrentWord}) => {
    const {roundEnded, roundAnsweredWords} = useSelector(state => state.game);

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
        <Dialog
            fullScreen
            open={roundEnded}
            onClose={() => {
            }}
            ref={contentRef}
            scroll="paper"
        >
            <DialogTitle sx={{padding: '16px 16px 8px 16px', fontSize: '20px', fontWeight: '600'}}>Счет: {roundAnsweredWords.length}</DialogTitle>
            <DialogContent sx={{
                padding: '0px 8px 20px 8px',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
                '&::-moz-scrollbar': {
                    display: 'none'
                }
            }}>
                <Typography variant="p" sx={{fontSize: "12px", paddingLeft: '8px'}}>Выберите угаданные слова</Typography>
                <GuessedWordsOptions />
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: '#FFFFFF',
                        padding: '16px',
                        borderTop: isContentOverflowing ? '1px solid #D1D1D1' : 'none'
                    }}
                >
                    <FinishRoundButton
                        setCurrentWord={setCurrentWord}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default GuessedWordsModal;
