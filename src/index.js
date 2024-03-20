import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter basename="/taskflow">
      <App />
    </BrowserRouter>
  </Provider>
)
