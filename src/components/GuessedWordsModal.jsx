import GuessedWordsOptions from "./GuessedWordsOptions";
import FinishRoundButton from "./FinishRoundButton";
import {Box, Modal, Typography} from "@mui/material";
import {useSelector} from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 600,
    maxHeight: '80%',
    overflowY: 'auto',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

const GuessedWordsModal = ({setCurrentWord, setCurrentAsker}) => {
    const {roundEnded, roundAnsweredWords} = useSelector(state => state.game);
    return (
        <Modal
            open={roundEnded}
            onClose={() => {
            }}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Счет: {roundAnsweredWords.length}
                </Typography>
                <GuessedWordsOptions/>
                <FinishRoundButton
                    setCurrentWord={setCurrentWord}
                    setCurrentAsker={setCurrentAsker}
                />
            </Box>
        </Modal>
    )

}

export default GuessedWordsModal;
