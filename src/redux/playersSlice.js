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
      console.log(existingPlayer)
      console.log(updatedInfo)
      if (existingPlayer) {
        Object.assign(existingPlayer, updatedInfo);
      }
    },
  },
});

export const { addPlayers, updatePlayer } = playersSlice.actions;

export default playersSlice.reducer;