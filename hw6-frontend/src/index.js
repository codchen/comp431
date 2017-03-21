import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import reducer from './reducers'
import App from './components/app'

// The mounting point of this app
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
