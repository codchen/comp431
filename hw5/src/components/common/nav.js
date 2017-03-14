import React from 'react';

import { navLogo } from '../../assets'

// The presentational component for navigation bar
// It takes two button containers to avoid directly accessing
// unnecessary functions and data.
const Navigation = ({ btn1, btn2 }) => (
	<nav className='nav'>
		<img className='navLogo' src={ navLogo } />
		{
			btn1()
		}
		{
			btn2()
		}
	</nav>
)

Navigation.propTypes = {
	btn1: React.PropTypes.func.isRequired,
	btn2: React.PropTypes.func.isRequired
}

export default Navigation