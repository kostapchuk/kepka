import {Box, Typography} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {useState} from "react";

const LanguageSwitcher = () => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography>Настройка игры 1 / 3</Typography>
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

export default LanguageSwitcher;
