import React from "react";
import Box from "@mui/material/Box";
import PrimaryButton from "./PrimaryButton";
import {useDispatch} from "react-redux";
import {setRandomizerModalOpen} from "../redux/gameSlice";
import {useTranslation} from "react-i18next";

const TeamSetupFooter = ({onContinue}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  return (
      <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <img
            src="/random-arrows.svg"
            onClick={() => dispatch(setRandomizerModalOpen(true))}
            alt="Generate teams"
            style={{backgroundColor: '#f0f0f0', padding: '12px', borderRadius: '12px', marginRight: '12px'}}
        />
        <PrimaryButton onClick={onContinue} content={t('continue')}/>
      </Box>
  );
};

export default TeamSetupFooter;
