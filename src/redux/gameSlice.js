import {createSlice} from '@reduxjs/toolkit'
import {v4 as uuidv4} from "uuid";

const initialState = {
  timer: 30,
  words: [],
  wordsCount: 42,
  leftWords: [],
  roundAnsweredWords: [],
  roundWords: [],
  tour: '',
  leftSeconds: {},
  currentTeam: '',
  currentGameId: uuidv4(),
  score: {},
  elapsedTime: 0,
  teams: [],
  timerRunning: false,
  currentWord: '',
  showLeftWords: true,
  showScoreDuringGame: true,
  timeLeftInRoundModalOpen: false,
  tourChangeModalOpen: false,
  actualLeftTimeInTour: 0,
  wordsDifficulty: 'EASY', // EASY, MEDIUM, HARD
  restartGameModalOpen: false,
  roundInProgress: false
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTimer: (state, action) => {
      state.timer = action.payload
    },
    setWords: (state, action) => {
      state.words = action.payload
    },
    setLeftWords: (state, action) => {
      state.leftWords = action.payload
    },
    setWordsCount: (state, action) => {
      state.wordsCount = action.payload
    },
    setRoundAnsweredWords: (state, action) => {
      state.roundAnsweredWords = action.payload
    },
    setRoundWords: (state, action) => {
      state.roundWords = action.payload
    },
    setTour: (state, action) => {
      state.tour = action.payload
    },
    setLeftSeconds: (state, action) => {
      state.leftSeconds = action.payload
    },
    setCurrentTeam: (state, action) => {
      state.currentTeam = action.payload
    },
    setCurrentGameId: (state, action) => {
      state.currentGameId = action.payload
    },
    setScore: (state, action) => {
      state.score = action.payload
    },
    setElapsedTime: (state, action) => {
      state.elapsedTime = action.payload
    },
    setTeams: (state, action) => {
      state.teams = action.payload
    },
    setTimerRunning: (state, action) => {
      state.timerRunning = action.payload
    },
    setCurrentWord: (state, action) => {
      state.currentWord = action.payload
    },
    setShowLeftWords: (state, action) => {
      state.showLeftWords = action.payload
    },
    setShowScoreDuringGame: (state, action) => {
      state.showScoreDuringGame = action.payload
    },
    setTourChangeModalOpen: (state, action) => {
      state.tourChangeModalOpen = action.payload
    },
    setActualLeftTimeInTour: (state, action) => {
      state.actualLeftTimeInTour = action.payload
    },
    setWordsDifficulty: (state, action) => {
      state.wordsDifficulty = action.payload
    },
    setRestartGameModalOpen: (state, action) => {
      state.restartGameModalOpen = action.payload
    },
    setRoundInProgress: (state, action) => {
      state.roundInProgress = action.payload
    },
    reset: () => initialState
  }
})

export const {
  setTimer,
  setWords,
  setWordsCount,
  setLeftWords,
  setRoundAnsweredWords,
  setRoundWords,
  setTour,
  setLeftSeconds,
  setCurrentTeam,
  setCurrentGameId,
  setScore,
  reset,
  setElapsedTime,
  setTeams,
  setTimerRunning,
  setCurrentWord,
  setShowLeftWords,
  setShowScoreDuringGame,
  setTourChangeModalOpen,
  setActualLeftTimeInTour,
  setWordsDifficulty,
  setRestartGameModalOpen,
  setRoundInProgress
} = gameSlice.actions

export default gameSlice.reducer
