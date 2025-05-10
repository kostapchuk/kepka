import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import React from "react";

import {setLanguageModalOpen} from "../../redux/gameSlice";
import useTranslationAndDispatch from "../../hooks/useTranslationAndDispatch";

const TeamSetupHeader = () => {

  const {dispatch, t} = useTranslationAndDispatch();

  return (
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3" fontSize="24px" fontWeight="600">
          {t('game-settings')} 1 / 3
        </Typography>
        <Box
            data-cy="change-language-modal-open-button"
            component="img"
            src="/language.svg"
            alt="Change language"
            sx={{width: 28}}
            onClick={() => dispatch(setLanguageModalOpen(true))}
        />
      </Stack>
  );
}

export default TeamSetupHeader;
