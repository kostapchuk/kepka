import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const OpenWordButton = styled(Button)({
    minHeight: '36vh',
    width: '100%',
    backgroundColor: '#7A51EC',
    color: '#FFFFFF',
    fontSize: '30px',
    borderRadius: '20px',
    touchAction: 'manipulation',
    ":disabled": { color: '#FFFFFF'}
});

export default OpenWordButton
