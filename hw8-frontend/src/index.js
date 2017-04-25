import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import reducer from './reducers'
import App from './components/app'
import { initialize } from './components/auth/container/authActions'
import { resource } from './utils/ajax'

// The mounting point of this app
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

resource('GET', 'session')
	.then((res) => {
		if (res.username) {
			initialize(res)(store.dispatch)
		}
	})
	.catch(_ => {})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
