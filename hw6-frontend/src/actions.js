// Global actions
export const Action = {
	LOCATION_CHANGE: 'LOCATION_CHANGE',
	MESSAGE: 'MESSAGE',
	NOOP: 'NOOP'
}

export const Locations = {
	MAIN_PAGE: 'MAIN_PAGE',
	PROFILE_PAGE: 'PROFILE_PAGE',
	LANDING_PAGE: 'LANDING_PAGE'
}

export const MessageTypes = {
	SUCCESS: 'SUCCESS',
	FAILURE: 'FAILURE'
}

// Synchronous action creators
export const errorMessage = (text) =>
	({ type: Action.MESSAGE, messageType: MessageTypes.FAILURE, text})
export const successMessage = (text) =>
	({ type: Action.MESSAGE, messageType: MessageTypes.SUCCESS, text})
export const toLanding = () =>
	({ type: Action.LOCATION_CHANGE, location: Locations.LANDING_PAGE })
export const toMain = () =>
	({ type: Action.LOCATION_CHANGE, location: Locations.MAIN_PAGE })
export const toProfile = () =>
	({ type: Action.LOCATION_CHANGE, location: Locations.PROFILE_PAGE })
export const noop = () => ({ type: Action.NOOP })

export const clearMessage = (delay) => (dispatch) =>
	setTimeout(() => {
		dispatch({ type: Action.MESSAGE, 
					messageType: MessageTypes.SUCCESS,
					text: ''})
	}, delay)

export const updateErrorMessage = (text) => (dispatch) => {
	dispatch(errorMessage(text))
	dispatch(clearMessage(3000))
}

export const updateSuccessMessage = (text) => (dispatch) => {
	dispatch(successMessage(text))
	dispatch(clearMessage(3000))
}