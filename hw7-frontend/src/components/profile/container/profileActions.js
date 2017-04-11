import { resource } from '../../../utils/ajax'
import validate, { errors } from '../../../utils/validations'
import { updateErrorMessage, updateSuccessMessage, noop }
	from '../../../actions'

export const Action = {
	UPDATE_EMAIL: 'UPDATE_EMAIL',
	UPDATE_ZIPCODE: 'UPDATE_ZIPCODE',
	SET_DOB: 'SET_DOB'
}

// Synchronous action creators
export const updateEmailAction = (param) =>
	({ type: Action.UPDATE_EMAIL, param })
export const updateZipcodeAction = (param) =>
	({ type: Action.UPDATE_ZIPCODE, param })
export const setDobAction = (param) => ({ type: Action.SET_DOB, param })

// Async action creators
export const updateEmail = (email) => {
	if (!validate('email', { email })) {
		return updateErrorMessage(errors.email)
	}
	return (dispatch) => putEmail(email)
		.then((email) => {
			dispatch(updateSuccessMessage('Update email success'))
			dispatch(updateEmailAction(email))
		})
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to update email: ${reason.message}`)))
}


export const updateZipcode = (zipcode) => {
	if (!validate('zipcode', { zipcode })) {
		return updateErrorMessage(errors.zipcode)
	}
	return (dispatch) => putZipcode(zipcode)
		.then((zipcode) => {
			dispatch(updateSuccessMessage('Update zipcode success'))
			dispatch(updateZipcodeAction(zipcode))
		})
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to update zipcode: ${reason.message}`)))
	}

export const updatePassword = (password) => {
	if (!validate('password', { password })) {
		return updateErrorMessage(errors.password)
	}
	return (dispatch) => putPassword(password)
			.then(() => { 
				dispatch(updateSuccessMessage(
					'Update password success (not persisted)'))
				dispatch(noop())
			})
			.catch((reason) => dispatch(updateErrorMessage(
				`Failed to update password: ${reason.message}`)))
}

export const getEmail = () => (dispatch) =>
	fetchEmail()
		.then((email) => dispatch(updateEmailAction(email)))
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to get email: ${reason.message}`)))

export const getZipcode = () => (dispatch) =>
	fetchZipcode()
		.then((zipcode) => dispatch(updateZipcodeAction(zipcode)))
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to get zipcode: ${reason.message}`)))

export const getDob = () => (dispatch) =>
	fetchDob()
		.then((dob) => dispatch(setDobAction(dob)))
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to get dob: ${reason.message}`)))

export const setInitialProfile = () => (dispatch) => {
	dispatch(getEmail())
	dispatch(getZipcode())
	dispatch(getDob())
}

// Async requests
const fetchEmail = () => resource('GET', 'email')
	.then((response) => response.email)
const fetchZipcode = () => resource('GET', 'zipcode')
	.then((response) => response.zipcode)
const fetchDob = () => resource('GET', 'dob')
	.then((response) => response.dob)
const putEmail = (email) => resource('PUT', 'email', { email })
	.then((response) => response.email)
const putZipcode = (zipcode) => resource('PUT', 'zipcode', { zipcode })
	.then((response) => response.zipcode)
const putPassword = (password) => resource('PUT', 'password', { password })