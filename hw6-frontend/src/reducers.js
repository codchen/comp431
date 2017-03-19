import { combineReducers } from 'redux'
import { Action, Locations, MessageTypes } from './actions'
import profile from './components/profile/container/profileReducer'
import article from './components/article/container/articleReducer'
import following from './components/main/container/followingReducer'
import home from './components/main/container/homeReducer'
import auth from './components/auth/container/authReducer'

const initialPage = {
	location: Locations.LANDING_PAGE,
	messageType: MessageTypes.SUCCESS,
	messageText: ''
}

// The page action reducer
export const page = (state = initialPage, action) => {
	switch (action.type) {
		case Action.LOCATION_CHANGE:
			return {
				...state,
				location: action.location
			}
		case Action.MESSAGE:
			return {
				...state,
				messageType: action.messageType,
				messageText: action.text
			}
		default:
			return state
	}
}


// The combined reducer to be registered
const reducer = combineReducers({
	page,
	profile,
	article,
	following,
	home,
	auth
})


export default reducer