import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import PrimaryButton from "../components/PrimaryButton";
import React, {useState} from "react";
import {setRestartGameModalOpen} from "@/redux/gameSlice";
import ScoresTab from "../components/ScoresTab";
import Button from "@mui/material/Button";
import ScrollablePageWithStickyFooter from "@/components/ScrollablePageWithStickyFooter";

const ResultsPage = () => {

    const {score} = useSelector(state => state.game);
    const dispatch = useDispatch()

    const openRestartGameModal = () => {
        dispatch(setRestartGameModalOpen(true))
    }

    const topTeam = Object.entries(score).reduce((highest, [team, currentScore]) => {
        return currentScore > highest[1] ? [team, currentScore] : highest;
    }, ['', -Infinity]);
    // word, player, team, tour, round, time

    const activeTabStyles = {
        backgroundColor: "#F0F0F0",
        fontSize: '16px',
        color: "#6B6B6B",
        fontWeight: '600',
        borderColor: '#D1D1D1',
        borderRadius: '100px'
    }

    const inactiveTabStyles = {
        backgroundColor: "#000000",
        fontSize: '16px',
        color: "#FFFFFF",
        fontWeight: '600',
        borderColor: '#D1D1D1',
        borderRadius: '100px'
    };
    const [currentBlock, setCurrentBlock] = useState('game')

    const children = <>
        <Typography variant="h3" sx={{fontSize: "20px", fontWeight: "600"}}>Конец игры</Typography>
        <ButtonGroup sx={{height: '58px', paddingTop: '16px', paddingBottom: '24px'}} fullWidth>
            <Button sx={currentBlock === 'game' ? activeTabStyles : inactiveTabStyles}
                    onClick={() => setCurrentBlock('team')}>Команда</Button>
            <Button sx={currentBlock === 'team' ? activeTabStyles : inactiveTabStyles}
                    onClick={() => setCurrentBlock('game')}>Игра</Button>
        </ButtonGroup>
        {currentBlock === 'game' &&
            <Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography variant="h3" sx={{fontSize: "20px", fontWeight: "600"}}>Поздравляем
                        победителей!</Typography>
                    <img src="/cap.png" alt="Cap" style={{width: '100px', paddingTop: '32px'}}/>
                    <Typography sx={{fontSize: '16px', paddingTop: '20px'}}>{topTeam[0]}</Typography>
                    <Typography
                        sx={{fontSize: '16px', color: '#6B6B6B', paddingTop: '8px'}}>{topTeam[1]}</Typography>

                    <Divider sx={{width: '95%', my: 2, border: '1px solid #D1D1D1', marginTop: '32px'}}/>
                    <Typography>🔜 Скоро здесь будет статистика игры</Typography>
                </Box>
                {/*<Typography>Статистика игры:</Typography>*/}
                {/*<Typography>Самое простое слово - </Typography>*/}
                {/*<Typography>Команды потратили всего 33 секунды на отгадывание</Typography>*/}
                {/*<Typography>Самое сложное слово - </Typography>*/}
                {/*<Typography>Команды потратили аж 57 секунд на отгадывание</Typography>*/}
            </Box>
        }
        {currentBlock === 'team' && <ScoresTab/>}
    </>

    const footer = <PrimaryButton onClick={openRestartGameModal} content="Начать заново"/>

    return (
        <ScrollablePageWithStickyFooter
            children={children}
            footer={footer}
        />
    )
}

export default ResultsPage;
