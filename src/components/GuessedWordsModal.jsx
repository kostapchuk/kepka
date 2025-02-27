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
            scroll='paper'
            PaperProps={{
                style: {
                    minWidth: '90%',
                },
            }}
        >
            <DialogTitle>Счет: {roundAnsweredWords.length}</DialogTitle>
            <DialogContent>
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
