import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice'
import categoriesReducer from './slices/categoriesSlice'
import toggleReducer from './slices/togglesSlice'
import editTaskReducer from './slices/editTaskSlices'
import deleteCategoryReducer from './slices/deleteCategorySlice'

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
    editTask: editTaskReducer,
    deleteCategory: deleteCategoryReducer,
    toggle: toggleReducer,
  },
})

export default store
