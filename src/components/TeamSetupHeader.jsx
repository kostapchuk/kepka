import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import {setLanguageModalOpen} from "../redux/gameSlice";
import useTranslationAndDispatch from "../hooks/useTranslationAndDispatch";

const TeamSetupHeader = () => {

    const {dispatch, t} = useTranslationAndDispatch();

    return (
        <Box sx={{display: "flex", justifyContent: "space-between", mb: 1}}>
            <Typography variant="h3" sx={{fontSize: "24px", fontWeight: '600'}}>
              {t('game-settings')} 1 / 3
            </Typography>
            <img src="/language.svg" alt="Change language" width="28"
                 onClick={() => dispatch(setLanguageModalOpen(true))}/>
        </Box>
    );
}

export default TeamSetupHeader;
