import { resource } from '../../../utils/ajax'
import { updateErrorMessage, updateSuccessMessage, noop }
	from '../../../actions'
import { setAllArticles }
	from '../../article/container/articleActions'

export const Action = {
	FOLLOWING: 'FOLLOWING',
	UPDATE_HEADLINES: 'UPDATE_HEADLINES',
	UPDATE_AVATARS: 'UPDATE_AVATARS'
}

// Synchronous action creators
export const followingAction = (username, following) =>
	({ type: Action.FOLLOWING, username, following })
export const updateHeadlinesAction = (params) =>
	({ type: Action.UPDATE_HEADLINES, params })
export const updateAvatarsAction = (params) => 
	({ type: Action.UPDATE_AVATARS, params })
export const setAllFollowing = () => (dispatch) =>
	fetchAllFollowing()
		.then(({ username, following }) =>
			dispatch(updateFollowing(username, following)))
		.catch((reason) =>
			dispatch(updateErrorMessage(
				`Failed to get following list: ${reason.message}`)))

// Async action creators
export const follow = (user) => {
	if (user === '') {
		return noop()
	}
	return (dispatch) => putFollow(user)
		.then(({ username, following }) => {
			dispatch(updateSuccessMessage(`Follow user ${user} success`))
			dispatch(setAllArticles())
			dispatch(updateFollowing(username, following))
		})
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to follow ${user}: ${reason.message}`)))
}

export const unfollow = (user) => (dispatch) =>
	deleteFollow(user)
		.then(({ username, following }) => {
			dispatch(updateSuccessMessage(`Unfollow user ${user} success`))
			dispatch(setAllArticles())
			dispatch(updateFollowing(username, following))
		})
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to unfollow ${user}: ${reason.message}`)))

export const updateHeadlines = (following) => (dispatch) =>
	fetchHeadlines(following)
		.then((headlines) => dispatch(updateHeadlinesAction(headlines)))
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to get headlines of some followed users:
				${reason.message}`)))

export const updateAvatars= (following) => (dispatch) =>
	fetchAvatars(following)
		.then((avatars) => dispatch(updateAvatarsAction(avatars)))
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to get avatars of some followed users:
				${reason.message}`)))

// Async requests
const fetchAllFollowing = () => resource('GET', 'following')
const fetchHeadlines = (following) => resource('GET', 'headlines/' +
	following.join(',')).then((response) => response.headlines)
const fetchAvatars = (following) => resource('GET', 'avatars/' +
	following.join(',')).then((response) => response.avatars)
const putFollow = (user) => resource('PUT', `following/${user}`)
const deleteFollow = (user) => resource('DELETE', `following/${user}`)

// helper action creator that dispatch actions to update everything about 
// a followed user
const updateFollowing = (username, following) => (dispatch) => {
	dispatch(updateHeadlines(following))
	dispatch(updateAvatars(following))
	dispatch(followingAction(username, following))
}