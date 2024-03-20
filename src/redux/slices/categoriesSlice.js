import { createSlice } from '@reduxjs/toolkit'
import { v4 as ID } from 'uuid'

const initialState = JSON.parse(localStorage.getItem('categories')) || [
  { id: ID(), title: 'Work', color: '#ff0000' },
  {
    id: ID(),
    title: 'Personal',
    color: '#006eff',
  },
]

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory: (state, action) => {
      localStorage.setItem(
        'categories',
        JSON.stringify([...state, action.payload])
      )
      return JSON.parse(localStorage.getItem('categories'))
    },
    deleteCategory: (state, action) => {
      const newState = state.filter(
        (category) => category.id !== action.payload.id
      )
      localStorage.setItem('categories', JSON.stringify(newState))
      return newState
    },
  },
})

export const { createCategory, deleteCategory } = categoriesSlice.actions

export const selectCategoriesList = (state) => state.categories

export default categoriesSlice.reducer
