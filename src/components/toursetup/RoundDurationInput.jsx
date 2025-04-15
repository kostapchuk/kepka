import React, {useRef} from 'react';
import {TextField, Typography} from "@mui/material";

const RoundDurationInput = ({timer, error, onChange, label}) => {
  const inputRef = useRef(null);

  return (
      <>
        <Typography sx={{fontSize: "14px", color: "#6B6B6B", mt: 3, mb: 0.5}}>
          {label}
        </Typography>
        <TextField
            type="tel"
            inputRef={inputRef}
            value={timer}
            error={!!error}
            helperText={error}
            onChange={onChange}
            sx={{
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
            }}
        />
      </>
  );
};

export default RoundDurationInput;
