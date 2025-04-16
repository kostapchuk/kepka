import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";

const Label = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#6B6B6B',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(0.5),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  borderRadius: '12px',
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '& fieldset': {
      borderColor: '#D1D1D1',
    },
    '&:hover fieldset': {
      borderColor: '#D1D1D1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7A51EC',
    },
  },
}));

const WordCountInput = ({ value, onChange, error, label }) => (
    <>
      <Label>{label}</Label>
      <StyledTextField
          data-cy="word-count-input"
          type="tel"
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error}
      />
    </>
);

export default WordCountInput;