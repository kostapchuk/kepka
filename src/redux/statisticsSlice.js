import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    wordStats: [], // {word, player, tour, team, time}
    lastClick: null,
    roundWordStats: []
}

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        addStats: (state, action) => {
            state.wordStats.push(action.payload);
        },
        setLastClick: (state, action) => {
            state.lastClick = action.payload
        },
        addRoundWordStats: (state, action) => {
            state.roundWordStats.push(action.payload);
        },
        clearRoundWordStats: (state, action) => {
            state.roundWordStats = [];
        },
        updateRoundWordStatsDuration: (state, action) => {
            const { word, duration } = action.payload;
            const itemToUpdate = state.roundWordStats.find(item => item.word === word);
            if (itemToUpdate) {
                itemToUpdate.duration = duration;
            }
        },
        reset: () => initialState
    }
})

export const {reset, addStats, setLastClick, addRoundWordStats, clearRoundWordStats, updateRoundWordStatsDuration} = statisticsSlice.actions

export default statisticsSlice.reducer
