import {Button} from '@mui/material';
import {styled} from '@mui/system';

const OpenWordButton = styled(Button)({
    minHeight: '40vh',
    width: '95%',
    backgroundColor: '#7A51EC',
    color: '#FFFFFF',
    fontSize: '30px',
    '&:hover': {
        backgroundColor: '#5B3EB1'
    }
});

export default OpenWordButton
