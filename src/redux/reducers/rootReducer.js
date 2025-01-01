import {combineReducers} from '@reduxjs/toolkit';
import pageSlice from "../pageSlice";
import playersSlice from "../playersSlice";
import gameSlice from "../gameSlice";

export const rootReducer = combineReducers({
    game: gameSlice,
    page: pageSlice,
    players: playersSlice
})