import { Action } from './homeActions'

const initialHome = {
	headline: '',
	avatar: ''
}

// Reducer of all headline actions
const home = (state = initialHome, action) => {
	switch (action.type) {
		case Action.UPDATE_HEADLINE:
			return {
				...state,
				headline: action.param
			}
		case Action.UPDATE_AVATAR:
			return {
				...state,
				avatar: action.param
			}
		default:
			return state
	}
}

export default home