import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'
import middleware from './middleware'


ReactDOM.render(
  <Provider store={createStore(reducer, middleware)}>
    <App />
  </Provider>,
  document.getElementById('root')
)
