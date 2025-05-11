import React from 'react';
import {useTheme} from "@mui/material/styles";

import BaseInput from "@/components/shared/BaseInput";
import LabeledInput from "@/components/shared/LabeledInput";

const RoundDurationInput = ({timer, error, onChange, label}) => {
  const theme = useTheme();

  return (
      <LabeledInput label={label}>
        <BaseInput
            dataCy="round-duration-input"
            fullWidth
            type="tel"
            value={timer}
            error={!!error}
            helperText={error}
            onChange={onChange}
            borderColor={theme.colors.stroke.default}
            activeBorderColor={theme.colors.control.primary}
        />
      </LabeledInput>
  );
};

export default RoundDurationInput;
