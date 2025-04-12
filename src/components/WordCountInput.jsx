import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const WordCountInput = ({ value, onChange, error, label }) => (
    <>
      <Typography sx={{ fontSize: "14px", color: "#6B6B6B", mt: 3, mb: 0.5 }}>
        {label}
      </Typography>
      <TextField
          type="tel"
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error}
          sx={{
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "& fieldset": { borderColor: "#D1D1D1" },
              "&:hover fieldset": { borderColor: "#D1D1D1" },
              "&.Mui-focused fieldset": { borderColor: "#7A51EC" }
            },
            width: "100%"
          }}
      />
    </>
);

export default WordCountInput;