import React from 'react';
import { Action } from './authActions'

const initialState = {
	username: '',
	loginLoading: false,
	regLoading: false,
	links: []
}

// reducer of all authentication actions
const auth = (state = initialState, action) => {
	switch (action.type) {
		case Action.LOGIN:
			return {
				...state,
				username: action.username
			}
		case Action.LOGIN_LOADING:
			return {
				...state,
				loginLoading: action.loading
			}
		case Action.REG:
			return state
		case Action.REG_LOADING:
			return {
				...state,
				regLoading: action.loading
			}
		case Action.LOGOUT:
			return initialState
		case Action.SET_LINKS:
			return {
				...state,
				links: action.links
			}
		default:
			return state
	}
}

export default auth