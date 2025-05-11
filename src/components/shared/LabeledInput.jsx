import {Stack, Typography} from "@mui/material";
import React from "react";
import {useTheme} from "@mui/material/styles";

const LabeledInput = ({label, children}) => {
  const theme = useTheme();

  return (
      <Stack gap={0.5}>
        <Typography fontSize="14px" color={theme.colors.gray.dark}>
          {label}
        </Typography>
        {children}
      </Stack>
  );
}

export default LabeledInput;