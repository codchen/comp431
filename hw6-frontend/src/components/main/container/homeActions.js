import { resource } from '../../../utils/ajax'
import { updateErrorMessage, updateSuccessMessage, noop }
	from '../../../actions'

export const Action = {
	UPDATE_HEADLINE: 'UPDATE_HEADLINE',
	UPDATE_AVATAR: 'UPDATE_AVATAR'
}

// Synchronous action creators
export const updateHeadlineAction = (headline) =>
	({ type: Action.UPDATE_HEADLINE, param: headline })
export const updateAvatarAction = (avatar) =>
	({ type: Action.UPDATE_AVATAR, param: avatar })

// Async action creators
export const updateHeadline = (headline) => {
	if (headline === '') {
		return noop()
	}
	return (dispatch) => putHeadline(headline)
		.then((headline) => {
			dispatch(updateSuccessMessage('Update headline success'))
			dispatch(updateHeadlineAction(headline))
		})
		.catch((reason) =>
			dispatch(updateErrorMessage(
				`Failed to update headline: ${reason.message}`)))
}

export const updateAvatar = (file) => (dispatch) =>
	putAvatar(file)
		.then((avatar) => {
			dispatch(updateSuccessMessage('Update avatar success'))
			dispatch(updateAvatarAction(avatar))
		})
		.catch((reason) =>
			dispatch(updateErrorMessage(
				`Failed to update avatar: ${reason.message}`)))

export const getHeadline = () => (dispatch) =>
	fetchHeadline()
		.then((headline) => dispatch(updateHeadlineAction(headline)))
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to get headline: ${reason.message}`)))

export const getAvatar = () => (dispatch) =>
	fetchAvatar()
		.then((avatar) => dispatch(updateAvatarAction(avatar)))
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to get avatar: ${reason.message}`)))

export const setInitialHome = () => (dispatch) => {
	dispatch(getHeadline())
	dispatch(getAvatar())
}

// Async requests
const fetchHeadline = () => resource('GET', 'headlines')
	.then((response) => response.headlines[0].headline)
const fetchAvatar = () => resource('GET', 'avatars')
	.then((response) => response.avatars[0].avatar)
const putHeadline = (headline) => resource('PUT', 'headline', { headline })
	.then((response) => response.headline)
const putAvatar = (file) =>
	resource('PUT', 'avatar', { message: '', file }, true)
		.then((response) => response.avatar)