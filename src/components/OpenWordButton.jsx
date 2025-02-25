import {Button} from '@mui/material';
import {styled} from '@mui/system';

const OpenWordButton = styled(Button)({
    minHeight: '39vh',
    width: '100%',
    backgroundColor: '#7A51EC',
    color: '#FFFFFF',
    fontSize: '30px',
    borderRadius: '10px 16px 16px 10px',
    ":disabled": { color: '#FFFFFF'}
});

export default OpenWordButton
