import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  menuActive: false,
  taskModalActive: false,
  categoriesModalActive: false,
  deleteCategoryModalActive: false,
}

const togglesSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      return { ...state, menuActive: action.payload }
    },
    toggleTaskModal: (state, action) => {
      return { ...state, taskModalActive: action.payload }
    },
    toggleCategoriesModal: (state, action) => {
      return { ...state, categoriesModalActive: action.payload }
    },
    toggleDeleteCategoryModal: (state, action) => {
      return { ...state, deleteCategoryModalActive: action.payload }
    },
  },
})

export const {
  toggleMenu,
  toggleTaskModal,
  toggleCategoriesModal,
  toggleDeleteCategoryModal,
} = togglesSlice.actions

export const selectToggleMenu = (state) => state.toggle.menuActive
export const selectToggleTaskModal = (state) => state.toggle.taskModalActive
export const selectToggleCategoriesModal = (state) =>
  state.toggle.categoriesModalActive
export const selectToggleDeleteCategoryModal = (state) =>
  state.toggle.deleteCategoryModalActive

export default togglesSlice.reducer
