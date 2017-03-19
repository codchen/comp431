import React from 'react'

import { FollowingUsersContainer, NewFollowingContainer }
	from './container/mainContainer'

// The presentational component for the whole following-users view
const FollowingView = () => (
	<div>
		<h1 className='ui header'>Currently following</h1>
		<FollowingUsersContainer />
		<br />
		<NewFollowingContainer />
	</div>
)

export default FollowingView