import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  timer: 30,
  words: [],
  wordsCount: 42,
  leftWords: [],
  answeredWords: [],
  tour: '',
  leftSeconds: {},
  currentTeam: '',
  currentGameId: '',
  score: {}
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
    setAnsweredWords: (state, action) => {
      state.answeredWords = action.payload
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
    reset: () => initialState
  }
})

export const {
  setTimer,
  setWords,
  setWordsCount,
  setLeftWords,
  setAnsweredWords,
  setTour,
  setLeftSeconds,
  setCurrentTeam,
  setCurrentGameId,
  setScore,
  reset
} = gameSlice.actions

export default gameSlice.reducer