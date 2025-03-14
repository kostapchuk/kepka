import {useDispatch, useSelector} from "react-redux";
import {Box, Typography} from "@mui/material";
import {setRestartGameModalOpen} from "../redux/gameSlice";

const GameHeader = () => {

    const {
        tour,
        currentTeam,
        currentGameId,
        roundInProgress
    } = useSelector(state => state.game);
    const players = useSelector(state => state.players);
    const dispatch = useDispatch();

    return (
        <Box sx={{display: "flex", justifyContent: 'space-between'}}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h3" sx={{fontSize: "42px"}} onClick={() => !roundInProgress && dispatch(setRestartGameModalOpen(true))}>
              🚪
            </Typography>
            <Typography variant="h3" sx={{fontSize: "24px"}}>
              Тур {<Typography variant="" sx={{fontSize: "24px", fontWeight: 600}}>{tour}</Typography>}
            </Typography>
          </Box>
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
