import React from 'react';
import { Locations } from '../actions'
import { navLogo } from '../assets'
import { Button } from 'semantic-ui-react'

// The presentational component for navigation bar
const Navigation = ({ username, location, onLogout, onToProfile, onToMain }) =>
{
	return (
		<nav className='nav'>
			<img className='inlineImg' src={ navLogo } />
			<Button basic color='blue' className='btnNav'
				onClick={ () => onLogout() }>Log out</Button>
			{location === Locations.MAIN_PAGE &&
				<Button basic color='blue' className='btnNav'
					onClick={ () => onToProfile() }>Profile</Button>}
			{location === Locations.PROFILE_PAGE &&
				<Button basic color='blue' className='btnNav'
					onClick={ () => onToMain() }>Main</Button>}
		</nav>
	)
}

export default Navigation