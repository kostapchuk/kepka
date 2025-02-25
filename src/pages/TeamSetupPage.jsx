import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addPlayers} from "../redux/playersSlice";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import {v4 as uuidv4} from 'uuid';
import {setCurrentGameId} from "../redux/gameSlice";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import Footer from "../components/Footer";
import {randomIndex} from "../util/arrayUtils";

const TeamSetupPage = () => {
  const dispatch = useDispatch();
  const [playerNames, setPlayerNames] = useState(['', '', '']);
  const [gameId, setGameId] = useState('');
  const players = useSelector(state => state.players);

  useEffect(() => {
    const newGameId = uuidv4();
    setGameId(newGameId);
  }, []);

  const handleInputChange = (index, value) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = value;
    setPlayerNames(newPlayerNames);
  };

  const addPlayersToRedux = () => {
    const filledPlayerNames = playerNames.filter(name => name.trim() !== '')
    const teamId = playerNames.join(' ');
    const askerIndex = randomIndex(filledPlayerNames);
    const newPlayers = filledPlayerNames
        .map((name, index) => ({
          name: name,
          asker: index === askerIndex,
          teamId: teamId,
          gameId: gameId,
        }));
    dispatch(addPlayers(newPlayers));
    setPlayerNames(['', '', '']);
  };

  const goToNextPage = () => {
    dispatch(setCurrentGameId(gameId))
    dispatch(setCurrentPage(Pages.GAME_SETUP_PAGE));
  }

  return (
      <Stack spacing={2}>
        {playerNames.map((name, index) => (
            <TextField
                key={index}
                label={`Имя игрока ${index + 1}`}
                value={name}
                onChange={(e) => handleInputChange(index, e.target.value)}
                variant="outlined"
                fullWidth
            />
        ))}
        <Button variant="contained" onClick={addPlayersToRedux} disabled={playerNames.filter(name => name.trim() !== '').length < 2 || playerNames.length !== new Set(playerNames).size}>
          Добавить игроков
        </Button>
        <Button variant="contained" onClick={goToNextPage} disabled={new Set(players.filter(p => p.gameId === gameId).map(p => p.teamId)).size < 2}>
          Перейти к настройке игровой команты
        </Button>
        <Footer/>
      </Stack>
  );
};

export default TeamSetupPage;
