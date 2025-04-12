import React from "react";
import {FormControl, MenuItem, Select} from "@mui/material";
import Typography from "@mui/material/Typography";

const DifficultySelector = ({ value, onChange, open, setOpen, options, label }) => (
    <>
      <Typography sx={{ fontSize: "14px", color: "#6B6B6B", mt: 2.5, mb: 0.5 }}>
        {label}
      </Typography>
      <FormControl fullWidth>
        <Select
            value={value}
            onChange={onChange}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            variant="outlined"
            IconComponent={() => (
                <img
                    src="/down.svg"
                    alt="dropdown"
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: "12px",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease"
                    }}
                />
            )}
            sx={{
              borderRadius: "12px",
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#D1D1D1" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#7A51EC" }
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: "12px",
                  "& .MuiMenuItem-root.Mui-selected": {
                    backgroundColor: "#7A51EC33",
                    borderRadius: "12px",
                    margin: "0 10px"
                  }
                }
              }
            }}
        >
          {options.map(opt => (
              <MenuItem key={opt.value} value={opt.value} sx={{ height: 48, margin: "0 8px" }}>
                {label === "words-difficulty" ? opt.label.toUpperCase() : opt.label}
              </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
);

export default DifficultySelector;