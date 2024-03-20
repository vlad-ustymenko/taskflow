import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('tasks')) || []

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      localStorage.setItem('tasks', JSON.stringify([...state, action.payload]))
      return JSON.parse(localStorage.getItem('tasks'))
    },
    completeTask: (state, action) => {
      state.forEach((task) => {
        if (task.id === action.payload) {
          task.isComplete = true
          task.subTasks.forEach((subTask) => {
            console.log('ok')
            subTask.isComplete = true
          })
        }
      })
      localStorage.setItem('tasks', JSON.stringify(state))
      return state
    },
    completeSubTask: (state, action) => {
      state.forEach((task) => {
        task.subTasks.forEach((subTask) => {
          if (subTask.id === action.payload) {
            subTask.isComplete = !subTask.isComplete
          }
        })
      })
      localStorage.setItem('tasks', JSON.stringify(state))
      return state
    },
    editTask: (state, action) => {
      const newState = state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      )
      localStorage.setItem('tasks', JSON.stringify(newState))
      return newState
    },
    deleteTasksWithCategory: (state, action) => {
      const newState = state.filter(
        (task) => task.category.title !== action.payload.title
      )
      localStorage.setItem('tasks', JSON.stringify(newState))
      return newState
    },
  },
})

export const {
  addTask,
  completeTask,
  completeSubTask,
  editTask,
  deleteTasksWithCategory,
} = tasksSlice.actions

export const selectTasksList = (state) => state.tasks

export default tasksSlice.reducer
