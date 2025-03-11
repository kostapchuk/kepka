import {useSelector} from "react-redux";
import {Box, Typography} from "@mui/material";

const GameHeader = () => {

    const {
        tour,
        currentTeam,
        currentGameId
    } = useSelector(state => state.game);
    const players = useSelector(state => state.players);

    return (
        <Box sx={{display: "flex", justifyContent: 'space-between'}}>
            <Typography variant="h3" sx={{fontSize: "24px"}}>
                Тур {<Typography variant="" sx={{fontSize: "24px", fontWeight: 600}}>{tour}</Typography>}
            </Typography>
            <Box>
                <Typography>Загадывает</Typography>
                <Typography>{players.filter(
                    p => p.gameId === currentGameId && p.teamId === currentTeam
                        && p.asker)[0].name} ({currentTeam})</Typography>
            </Box>
        </Box>
    );
}

export default GameHeader;
