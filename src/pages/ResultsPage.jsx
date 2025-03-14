import {useDispatch, useSelector} from "react-redux";
import Stack from "@mui/material/Stack";
import {Box, ButtonGroup, Divider, Typography} from "@mui/material";
import PrimaryButton from "../components/PrimaryButton";
import {useEffect, useRef, useState} from "react";
import {setRestartGameModalOpen, setShowScoreDuringGame} from "../redux/gameSlice";
import GameTab from "../components/GameTab";
import ScoresTab from "../components/ScoresTab";
import Button from "@mui/material/Button";

const ResultsPage = () => {

    const {score} = useSelector(state => state.game);
    const dispatch = useDispatch()

    // <div className="App">
    //     {Object.entries(score).map(([team, score]) => (
    //         <p key={Math.random()}>{team}: {score}</p>
    //     ))}
    // </div>

    const contentRef = useRef(null);
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);

    const checkContentOverflow = () => {
        if (contentRef.current) {
            const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
            setIsContentOverflowing(isOverflowing);
        }
    };

    useEffect(() => {
        dispatch(setShowScoreDuringGame(true))
        checkContentOverflow();
        window.addEventListener('resize', checkContentOverflow);
        return () => window.removeEventListener('resize', checkContentOverflow);
    }, []);

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

    return (
        <>
            <Stack sx={{
                marginBottom: '85px'
            }} ref={contentRef}>
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
                            <Typography variant="h3" sx={{fontSize: "20px", fontWeight: "600"}}>Поздравляем победителей!</Typography>
                            <img src='/cap.svg' alt='Cap' style={{width: '100px', paddingTop: '32px'}}/>
                            <Typography sx={{fontSize: '16px', paddingTop: '20px'}}>{topTeam[0]}</Typography>
                            <Typography sx={{fontSize: '16px', color: '#6B6B6B', paddingTop: '8px'}}>{topTeam[1]}</Typography>

                            <Divider sx={{ width: '95%', my: 2, border: '1px solid #D1D1D1', marginTop: '32px' }} />
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
            </Stack>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    padding: '16px',
                    paddingBottom: '32px',
                    borderTop: isContentOverflowing ? '1px solid #D1D1D1' : 'none'
                }}
            >
                <PrimaryButton onClick={openRestartGameModal} content="Начать заново"/>
            </Box>
        </>
    )
}

export default ResultsPage;
