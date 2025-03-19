import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React, {useTransition} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const ResultsTab = () => {

    const {score} = useSelector(state => state.game);
    const {t} = useTranslation();

    const topTeam = Object.entries(score).reduce((highest, [team, currentScore]) => {
        return currentScore > highest[1] ? [team, currentScore] : highest;
    }, ['', -Infinity]);

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant="h3" sx={{fontSize: "20px", fontWeight: "600"}}>
                    {t('congratulations')}
                </Typography>
                <img src="/cap.png" alt="Cap" style={{width: '100px', paddingTop: '32px'}}/>
                <Typography sx={{fontSize: '16px', pt: 2.5}}>
                    {topTeam[0]}
                </Typography>
                <Typography sx={{fontSize: '16px', color: '#6B6B6B', pt: 1}}>
                    {topTeam[1]}
                </Typography>
                <Divider sx={{width: '95%', border: '1px solid #D1D1D1', mt: 4, mb: 2}}/>
                <Typography>🔜 {t('soon-statistics')}</Typography>
            </Box>
            {/*word, player, team, tour, round, time*/}
            {/*<Typography>Статистика игры:</Typography>*/}
            {/*<Typography>Самое простое слово - </Typography>*/}
            {/*<Typography>Команды потратили всего 33 секунды на отгадывание</Typography>*/}
            {/*<Typography>Самое сложное слово - </Typography>*/}
            {/*<Typography>Команды потратили аж 57 секунд на отгадывание</Typography>*/}
        </Box>
    )
}

export default ResultsTab;
