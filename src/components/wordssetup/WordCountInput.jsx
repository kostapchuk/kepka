import React from "react";
import {useTheme} from "@mui/material/styles";

import BaseInput from "@/components/shared/BaseInput";
import LabeledInput from "@/components/shared/LabeledInput";

const WordCountInput = ({ value, onChange, error, label }) => {
  const theme = useTheme();

  return (
      <LabeledInput label={label}>
        <BaseInput
            fullWidth
            dataCy="word-count-input"
            type="tel"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error}
            borderColor={theme.colors.stroke.default}
            activeBorderColor={theme.colors.control.primary}
        />
      </LabeledInput>
  );
}

export default WordCountInput;