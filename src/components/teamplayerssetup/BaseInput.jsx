import TextField from "@mui/material/TextField";
import React from "react";
import {useTheme} from "@mui/material/styles";

const BaseInput = ({
  dataCy,
  inputRef,
  placeholder,
  value,
  onChange,
  onBlur,
  onKeyDown,
  error,
  helperText,
  backgroundColor,
  borderColor,
  activeBorderColor,
  slotProps,
  onClick
}) => {
  const theme = useTheme();

  return (
      <TextField
          autoComplete="off"
          data-cy={dataCy}
          inputRef={inputRef}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: backgroundColor,
              '& fieldset': {
                borderColor: borderColor
              },
              '&:hover fieldset': {
                borderColor: error ? theme.palette.error.main
                    : borderColor
              },
              '&.Mui-focused fieldset': {
                borderColor: activeBorderColor
              }
            },
            flex: 1
          }}
          onClick={onClick}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          error={error}
          helperText={helperText}
          slotProps={slotProps}
      />
  );
}

export default BaseInput;