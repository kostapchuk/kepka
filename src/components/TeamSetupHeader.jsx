import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import React, {useState} from "react";

const TeamSetupHeader = () => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <Box sx={{display: "flex", justifyContent: "space-between", marginBottom: "8px"}}>
            <Typography variant="h3" sx={{fontSize: "24px", fontWeight: 600}}>Настройка игры 1 / 3</Typography>
            <Tooltip
                title="Скоро"
                arrow
                open={tooltipOpen}
                onClose={() => setTooltipOpen(false)}
            >
                <img src="/language.svg" alt="Change language" width="28" onClick={() => setTooltipOpen(true)}/>
            </Tooltip>
        </Box>
    );
}

export default TeamSetupHeader;
