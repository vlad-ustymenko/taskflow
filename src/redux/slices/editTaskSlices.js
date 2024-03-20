import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const editTaskSlice = createSlice({
  name: 'editTask',
  initialState,
  reducers: { addTaskToEdit: (state, action) => action.payload },
})

export const { addTaskToEdit } = editTaskSlice.actions

export const selectEditTask = (state) => state.editTask

export default editTaskSlice.reducer
