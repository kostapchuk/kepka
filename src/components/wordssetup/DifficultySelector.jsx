import React from "react";
import {FormControl, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";

import LabeledInput from "@/components/shared/LabeledInput";

const DifficultySelector = ({value, onChange, open, setOpen, options, label}) => {
  const {t} = useTranslation();

  return (
      <LabeledInput label={label}>
        <FormControl fullWidth>
          <Select
              data-cy="difficulty-dropdown"
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
                "&:hover .MuiOutlinedInput-notchedOutline": {borderColor: "#D1D1D1"},
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {borderColor: "#7A51EC"}
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
            {options.map(opt =>
                <MenuItem key={opt.value} value={opt.value}
                          data-cy={`difficulty-item-${opt.value}`}
                          sx={{height: 48, margin: "0 8px"}}>
                  {t(opt.label)}
                </MenuItem>
            )}
          </Select>
        </FormControl>
      </LabeledInput>
  );
};

export default DifficultySelector;