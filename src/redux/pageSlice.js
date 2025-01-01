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
    }
  }
})

export const {setCurrentPage} = pageSlice.actions

export default pageSlice.reducer