import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import Landing from './auth/landing'
import Main from './main/main'
import Profile from './profile/profile'

import { Locations, MessageTypes } from '../actions'

// The switch presentational component
const Page = ({ location }) => {
	switch (location) {
		case Locations.MAIN_PAGE:
			return <Main />
		case Locations.LANDING_PAGE:
			return <Landing />
		case Locations.PROFILE_PAGE:
			return <Profile />
		default:
			return <div>Error: Unknown location</div>
	}
}

// The main app container component
const App = connect((state) => {
	return {
		location: state.page.location,
		messageType: state.page.messageType,
		messageText: state.page.messageText
	}
})(({ location, messageType, messageText }) => (
	<div>
		<ReactCSSTransitionGroup
			transitionName='notification'
			transitionEnterTimeout={500}
			transitionLeaveTimeout={300}>
			{ messageText !== '' &&
				(<div key={messageText} className={ 'notification ' +
					(messageType === MessageTypes.SUCCESS ? 
					'success' : 'error') }>
					{ messageText }</div>) }
		</ReactCSSTransitionGroup>
		<Page location={ location } />
	</div>))

export default App