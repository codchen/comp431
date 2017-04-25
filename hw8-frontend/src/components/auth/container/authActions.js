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
	REG_LOADING: 'REG_LOADING',
	SET_LINKS: 'SET_LINKS'
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
export const setLinks = (links) => ({ type: Action.SET_LINKS, links })

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
		.then((res) => {
			dispatch(loginReceived())
			dispatch(updateSuccessMessage(`Login Successfully as ${username}`))
			initialize(res)(dispatch)
		})
		.catch((reason) => {
			dispatch(loginReceived())
			dispatch(updateErrorMessage(`Login failed: ${reason.message}`))
		})
}

export const link = (username, password) => (dispatch) => {
	dispatch(loginRequested())
	return postLink(username, password)
		.then(() => {
			dispatch(loginReceived())
			dispatch(updateSuccessMessage(`Account linked Successful as ${username}`))
			window.location.reload(true)
		})
		.catch((reason) => {
			dispatch(loginReceived())
			dispatch(updateErrorMessage(`Linking account failed: ${reason.message}`))
		})
}

export const unlink = (type) => (dispatch) => {
	return putUnlink(type)
		.then((links) => {
			dispatch(updateSuccessMessage(`Unlink account successful`))
			dispatch(setLinks(links))
		})
		.catch((reason) => {
			dispatch(updateErrorMessage(`Unlinking account failed: ${reason.message}`))
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

export const initialize = (res) => (dispatch) => {
	dispatch(toMain())
	dispatch(setAllArticles())
	dispatch(setAllFollowing())
	dispatch(setInitialHome())
	dispatch(setInitialProfile())
	dispatch(setLinks(res.links))
	// Actual login
	dispatch(loginAction(res.username))
}

// Async requests
const postRegister = (userInfo) =>
	resource('POST', 'register', userInfo)
		.then((response) => response.username)
const postLogin = (username, password) =>
	resource('POST', 'login', { username, password })
		.then((response) => ({
			username: response.username,
			links: response.links 
		}))
const postLink = (username, password) =>
	resource('POST', 'login', { username, password })
const putLogout = () => resource('PUT', 'logout')
		.then((response) => response.links)
const putUnlink = (type) => resource('PUT', 'unlink', { type })