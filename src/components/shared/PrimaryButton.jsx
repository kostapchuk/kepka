import React from 'react';
import Button from "@mui/material/Button";
import {styled} from '@mui/material/styles';

const StyledButton = styled(Button)({
  width: '100%',
  backgroundColor: '#7A51EC',
  borderRadius: '12px',
  color: '#FFFFFF',
  height: '48px',
  fontWeight: '600',
  fontSize: '16px',
  textTransform: 'none'
});

const PrimaryButton = ({onClick, content, dataCy}) => (
    <StyledButton onClick={onClick} data-cy={dataCy}>
      {content}
    </StyledButton>
);

export default PrimaryButton;
