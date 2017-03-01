import * as Actions from './actions'
import * as Validations from './validations'

// This file provides creators for all Redux actions used in this app
// as well as performs required validations

export const changeLocation = (newLocation) => {
	return { type: Actions.LOCATION_CHANGE, newLocation }
}

export const login = (username, password) => {
	const validationResult = Validations.validateLogin(username, password)
	if (validationResult.username && validationResult.password) {
		return { type: Actions.LOG_IN, username, password }
	} else {
		if (!validationResult.username) {
			return { type: Actions.ERROR,
				code: Actions.Errors.LOG_IN_USERNAME }
		} else {
			return { type: Actions.ERROR,
				code: Actions.Errors.LOG_IN_PASSWORD }
		}
	}
}

export const register = (userInfo) => {
	if (!Validations.validateUsername(userInfo.username)) {
		return { type: Actions.ERROR, code: Actions.Errors.REGISTER_USERNAME}
	}
	if (!Validations.validatePassword(userInfo.password)) {
		return { type: Actions.ERROR, code: Actions.Errors.REGISTER_PASSWORD}
	}
	if (!Validations.validateEmail(userInfo.email)) {
		return { type: Actions.ERROR, code: Actions.Errors.REGISTER_EMAIL}
	}
	if (!Validations.validatePhone(userInfo.phone)) {
		return { type: Actions.ERROR, code: Actions.Errors.REGISTER_PHONE}
	}
	if (!Validations.validateBirthday(userInfo.birthday)) {
		return { type: Actions.ERROR, code: Actions.Errors.REGISTER_BIRTHDAY}
	}
	if (!Validations.validateZip(userInfo.zip)) {
		return { type: Actions.ERROR, code: Actions.Errors.REGISTER_ZIP}
	}
	return { type: Actions.REGISTER, userInfo }
}

export const toggleLanding = () => {
	return { type: Actions.LANDING_TOGGLE }
}

export const logout = () => {
	return { type: Actions.LOG_OUT }
}

let newArticleID = 8
export const postArticle = (author, text) =>  {
	return { type: Actions.POST_ARTICLE,
		articleID: newArticleID++, author, text}
}

export const setArticleFilter = (filter, keyword) => {
	return { type: Actions.SET_ARTICLE_FILTER, filter, keyword }
}

export const updateHeadline = (newHeadline) => {
	return { type: Actions.UPDATE_HEADLINE, newHeadline }
}

export const followUser = (toFollow) => {
	return { type: Actions.FOLLOW_USER, toFollow }
}

export const unfollowUser = (toUnfollow) => {
	return { type: Actions.UNFOLLOW_USER, toUnfollow }
}

export const updateInfo = (userInfo) => {
	if (userInfo.username &&
		!Validations.validateUsername(userInfo.username)) {
		return { type: Actions.ERROR, code: Actions.Errors.UPDATE_USERNAME}
	}
	if (userInfo.password &&
		!Validations.validatePassword(userInfo.password)) {
		return { type: Actions.ERROR, code: Actions.Errors.UPDATE_PASSWORD}
	}
	if (userInfo.email && !Validations.validateEmail(userInfo.email)) {
		return { type: Actions.ERROR, code: Actions.Errors.UPDATE_EMAIL}
	}
	if (userInfo.phone && !Validations.validatePhone(userInfo.phone)) {
		return { type: Actions.ERROR, code: Actions.Errors.UPDATE_PHONE}
	}
	if (userInfo.zip && !Validations.validateZip(userInfo.zip)) {
		return { type: Actions.ERROR, code: Actions.Errors.UPDATE_ZIP}
	}
	return { type: Actions.UPDATE_INFO, userInfo }
}

export const updateImage = (image) => {
	return { type: Actions.UPDATE_IMAGE, image }
}

export const clearError = () => {
	return { type: Actions.CLEAR_ERROR }
}
