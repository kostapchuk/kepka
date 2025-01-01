import {createSlice} from "@reduxjs/toolkit";

const initialState = []

export const playersSlice = createSlice({
  name: 'players',
  initialState: initialState,
  reducers: {
    addPlayers: (state, action) => {
      state.push(...action.payload);
    },
    updatePlayer: (state, action) => {
      const { index, updatedInfo } = action.payload;
      const existingPlayer = state[index];
      if (existingPlayer) {
        Object.assign(existingPlayer, updatedInfo);
      }
    },
    reset: () => initialState
  },
});

export const { addPlayers, updatePlayer, reset } = playersSlice.actions;

export default playersSlice.reducer;