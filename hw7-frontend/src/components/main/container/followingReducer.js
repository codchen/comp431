import { Action } from './followingActions'

const initialFollowing = {
	username: '',
	following: []
}

// Reducer of all following actions
const following = (state = initialFollowing, action) => {
	switch (action.type) {
		case Action.FOLLOWING:
			return {
				...state,
				username: action.username,
				following: action.following.map((id) => ({ id }))
			}
		case Action.UPDATE_HEADLINES:
		case Action.UPDATE_AVATARS:
			return {
				...state,
				following: state.following.map((f) => ({
					...f,
					...action.params.find((p) => p.username === f.id)
				}))
			}
		default:
			return state
	}
}

export default following