import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../redux/pageSlice";
import {Pages} from "../routes";
import {
  setCurrentTeam,
  setLeftWords,
  setTour,
  setWords
} from "../redux/gameSlice";
import ResetFullGame from "../components/ResetFullGame";

const GameSetupPage = () => {

  const totalWords = [
    "дом",
    "книга",
    "стул",
    "стол",
    "машина",
    "окно",
    "человек",
    "собака",
    "кошка",
    "птица",
    "дерево",
    "река",
    "гора",
    "город",
    "улица",
    "школа",
    "университет",
    "магазин",
    "работа",
    "телефон",
    "компьютер",
    "ручка",
    "карандаш",
    "бумага",
    "свет",
    "тень",
    "музыка",
    "фильм",
    "картина",
    "еда",
    "вода",
    "воздух",
    "солнце",
    "луна",
    "звезда",
    "мир",
    "жизнь",
    "счастье",
    "любовь",
    "время",
    "место",
    "семья",
    "друг",
    "враг",
    "история",
    "культура",
    "наука",
    "знание",
    "информация",
    "идея",
    "мечта",
    "шанс",
    "план",
    "цель",
    "проблема",
    "решение",
    "успех",
    "провал",
    "опыт",
    "ошибка",
    "урок",
    "игра",
    "спорт",
    "соревнование",
    "победа",
    "поражение",
    "команда",
    "лидер",
    "участник",
    "зритель",
    "событие",
    "праздник",
    "традиция",
    "обычай",
    "искусство",
    "литература",
    "поэзия",
    "театр",
    "музыка",
    "танец",
    "фотография",
    "кино",
    "путешествие",
    "приключение",
    "природа",
    "животное",
    "растение",
    "болезнь",
    "здоровье",
    "лекарство",
    "врач",
    "пациент",
    "больница",
    "клиника",
    "школа",
    "учитель",
    "ученик",
    "класс",
    "предмет",
    "оценка"
  ];

  const {timer, wordsCount, currentGameId} = useSelector(state => state.game);
  const dispatch = useDispatch();
  const players = useSelector(state => state.players);


  const goToGamePage = () => {
    dispatch(setCurrentPage(Pages.GAME_PAGE));
    const words = randomWords()
    dispatch(setWords(words))
    dispatch(setLeftWords(words))
    dispatch(setTour('Alias'))
    const currentPlayersInGame = players.filter(p => p.gameId === currentGameId)
    dispatch(setCurrentTeam(currentPlayersInGame[Math.floor(Math.random() * currentPlayersInGame.length)].teamId))
  }

  function randomWords(count = 4) {
    const shuffledArray = totalWords.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  }

  return (
      <div>
        <p>Game settings</p>
        <p>Round duration, seconds: {timer}</p>
        <p>Game words, count: {wordsCount}</p>
        <button onClick={goToGamePage}>
          Start game
        </button>
        <ResetFullGame/>
      </div>
  );
};

export default GameSetupPage;