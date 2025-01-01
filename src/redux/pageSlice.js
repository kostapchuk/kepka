import {createSlice} from '@reduxjs/toolkit'
import {Pages} from "../routes";

const initialState = {
  currentPage: Pages.WELCOME_PAGE
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    reset: () => initialState
  }
})

export const {setCurrentPage, reset} = pageSlice.actions

export default pageSlice.reducer