import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const deleteCategorySlice = createSlice({
  name: 'deleteCategory',
  initialState,
  reducers: { addCategoryToDelete: (state, action) => action.payload },
})

export const { addCategoryToDelete } = deleteCategorySlice.actions

export const selectDeletableCategory = (state) => state.deleteCategory

export default deleteCategorySlice.reducer
