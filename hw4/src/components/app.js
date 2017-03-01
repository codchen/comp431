import React from 'react';
import { connect } from 'react-redux'
import SocialAppLanding from './auth/landing'
import Main from './main/main'
import Profile from './profile/profile'
import { Locations } from '../actions'

// The switch presentational component
const Page = ({ location }) => {
	switch (location) {
		case Locations.MAIN_PAGE:
			return <Main />
		case Locations.LANDING_PAGE:
			return <SocialAppLanding />
		case Locations.PROFILE_PAGE:
			return <Profile />
		default:
			return <div>Error: Unknown location</div>
	}
}

// The main app container component
const App = connect((state) => { 
		return { location: state.page.location }
	})(Page)

export default App