import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addPlayers} from "../redux/playersSlice";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import {v4 as uuidv4} from 'uuid';
import {setCurrentGameId} from "../redux/gameSlice";
import ResetFullGame from "../components/ResetFullGame";

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
    const newPlayers = filledPlayerNames
        .map((name, index) => ({
          name: name,
          asker: index === 0,
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
      <div>
        <button onClick={addPlayersToRedux} disabled={playerNames.filter(name => name.trim() !== '').length < 2 || playerNames.length !== new Set(playerNames).size}>
          Add Players
        </button>
        {playerNames.map((name, index) => (
            <input
                key={index}
                type="text"
                value={name}
                onChange={(e) => handleInputChange(index, e.target.value)}
            />
        ))}
        <button onClick={goToNextPage} disabled={new Set(players.filter(p => p.gameId === gameId).map(p => p.teamId)).size < 2}>
          Go to game setup page
        </button>
        <ResetFullGame/>
      </div>
  );
};

export default TeamSetupPage;