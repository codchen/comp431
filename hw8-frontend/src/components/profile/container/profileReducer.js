import { Action } from './profileActions'

const initialProfile = {
	email: '',
	zipcode: '',
	dob: ''
}

// Reducer of all profile actions
const profile = (state = initialProfile, action) => {
	switch (action.type) {
		case Action.UPDATE_EMAIL:
			return {
				...state,
				email: action.param
			}
		case Action.UPDATE_ZIPCODE:
			return {
				...state,
				zipcode: action.param
			}
		case Action.SET_DOB:
			return {
				...state,
				dob: new Date(action.param)
			}
		default:
			return state
	}
}

export default profile