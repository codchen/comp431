import { resource } from '../../../utils/ajax'
import validate, { errors } from '../../../utils/validations'

import { toMain, toLanding, updateErrorMessage, updateSuccessMessage }
	from '../../../actions'
import { setAllArticles } from '../../article/container/articleActions'
import { setAllFollowing } from '../../main/container/followingActions'
import { setInitialHome } from '../../main/container/homeActions'
import { setInitialProfile } from '../../profile/container/profileActions'

export const Action = {
	REG: 'REG',
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	LOGIN_LOADING: 'LOGIN_LOADING',
	REG_LOADING: 'REG_LOADING'
}

// Synchronous action creators
export const registerAction = (username) => ({ type: Action.REG, username })
export const loginAction = (username) => ({ type: Action.LOGIN, username })
export const logoutAction = () => ({ type: Action.LOGOUT })
export const loginRequested = () => ({ type: Action.LOGIN_LOADING,
										loading: true })
export const loginReceived = () => ({ type: Action.LOGIN_LOADING,
										loading: false })
export const registerRequested = () => ({ type: Action.REG_LOADING,
										loading: true })
export const registerReceived = () => ({ type: Action.REG_LOADING,
										loading: false })

// Async action creators
export const register = (userInfo) => {
	// register validation
	let message
	const validationError = Object.keys(errors).some((type) => {
		if (!validate(type, userInfo)) {
			message = updateErrorMessage(errors[type])
			return true
		}
		return false
	})
	// dispatch an error message if validation failed
	if (validationError) {
		return message
	}

	// register
	return (dispatch) => {
		dispatch(registerRequested())
		return postRegister(userInfo)
			.then((username) => {
				dispatch(registerReceived())
				dispatch(updateSuccessMessage(
					`Registration Successful for ${username}`))
				dispatch(registerAction(username))
			})
			.catch((reason) => {
				dispatch(registerReceived())
				dispatch(updateErrorMessage(
					`Registration failed: ${reason.message}`))
			})
	}
}

export const login = (username, password) => (dispatch) => {
	dispatch(loginRequested())
	return postLogin(username, password)
		.then((username) => {
			dispatch(loginReceived())
			dispatch(updateSuccessMessage(`Login Successful as ${username}`))
			dispatch(toMain())
			// Initial fetch of user profile, article feeds, and followed users
			dispatch(setAllArticles())
			dispatch(setAllFollowing())
			dispatch(setInitialHome())
			dispatch(setInitialProfile())
			// Actual login
			dispatch(loginAction(username))
		})
		.catch((reason) => {
			dispatch(loginReceived())
			dispatch(updateErrorMessage(`Login failed: ${reason.message}`))
		})
}

export const logout = () => (dispatch) =>
	putLogout().
		then((_) => {
			dispatch(updateSuccessMessage('Logout successful'))
			dispatch(toLanding())
			dispatch(logoutAction())
		})
		.catch((reason) => dispatch(updateErrorMessage(
			`Logout failed: ${reason.message}`)))

// Async requests
const postRegister = (userInfo) =>
	resource('POST', 'register', userInfo)
		.then((response) => response.username)
const postLogin = (username, password) =>
	resource('POST', 'login', { username, password })
		.then((response) => response.username)
const putLogout = () => resource('PUT', 'logout')