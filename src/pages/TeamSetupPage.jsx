import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
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
    const [playerNames, setPlayerNames] = useState([]);
    const [gameId, setGameId] = useState('');
    const players = useSelector(state => state.players);
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        const newGameId = uuidv4();
        setGameId(newGameId);
    }, []);


    const handlePlayerNameChange = (name) => {
        setPlayerName(name);
    };

    const handleBlur = () => {
        setPlayerNames(prevState => [...prevState, playerName]);
        setPlayerName('');
    }

    const handlePlayerNameChangeByIndex = (index, name) => {
        const updatedNames = [...playerNames];
        updatedNames[index] = name;
        setPlayerNames(updatedNames);
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
                gameId: gameId
            }));
        dispatch(addPlayers(newPlayers));
        setPlayerNames([]);
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
                    value={name}
                    onChange={(e) => handlePlayerNameChangeByIndex(index, e.target.value)}
                    variant="outlined"
                    fullWidth
                />
            ))}
            <TextField
                key='emptyPlayerInputKey'
                label="Введите имя игрока"
                value={playerName}
                onChange={(e) => handlePlayerNameChange(e.target.value)}
                variant="outlined"
                onBlur={handleBlur}
                fullWidth
            />
            <Button variant="contained" onClick={addPlayersToRedux}
                    disabled={playerNames.filter(name => name.trim() !== '').length < 2 || playerNames.length !== new Set(playerNames).size}>
                Добавить игроков
            </Button>
            <Button variant="contained" onClick={goToNextPage}
                    disabled={new Set(players.filter(p => p.gameId === gameId).map(p => p.teamId)).size < 2}>
                Продолжить
            </Button>
            <Footer/>
        </Stack>
    );
};

export default TeamSetupPage;
