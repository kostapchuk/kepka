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
  roundEnded: false,
  teams: []
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
    setRoundEnded: (state, action) => {
      state.roundEnded = action.payload
    },
    setTeams: (state, action) => {
      state.teams = action.payload
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
  setRoundEnded,
  setTeams
} = gameSlice.actions

export default gameSlice.reducer
