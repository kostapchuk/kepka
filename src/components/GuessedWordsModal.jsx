import GuessedWordsOptions from "./GuessedWordsOptions";
import FinishRoundButton from "./FinishRoundButton";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useSelector} from "react-redux";

const GuessedWordsModal = ({setCurrentWord, setCurrentAsker}) => {
    const {roundEnded, roundAnsweredWords} = useSelector(state => state.game);
    return (
        <Dialog
            open={roundEnded}
            onClose={() => {
            }}
            scroll="paper"
            PaperProps={{
                style: {
                    minWidth: '90%',
                    borderRadius: '20px'
                }
            }}
        >
            <DialogTitle sx={{padding: '20px 8px 16px 16px'}}>Счет: {roundAnsweredWords.length}</DialogTitle>
            <DialogContent sx={{
                padding: '0px 8px 20px 8px',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
                '&::-moz-scrollbar': {
                    display: 'none'
                }
            }}>
                <GuessedWordsOptions/>
                <FinishRoundButton
                    setCurrentWord={setCurrentWord}
                    setCurrentAsker={setCurrentAsker}
                />
            </DialogContent>
        </Dialog>
    )
}

export default GuessedWordsModal;
