import React from "react";
import {Box, Divider} from "@mui/material";
import WinnerCongratulations from "./WinnerCongratulations";
import MainStatistics from "./MainStatistics";
import DetailedStatistics from "./DetailedStatistics";

const ResultsTab = () => (
    <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
    >
      <WinnerCongratulations/>
      <Divider sx={{width: "95%", border: "1px solid #D1D1D1", mt: 4, mb: 2}}/>
      <MainStatistics/>
      <DetailedStatistics/>
    </Box>
);

export default ResultsTab;
