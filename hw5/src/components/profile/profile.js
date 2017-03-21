import React from 'react'
import { connect } from 'react-redux'
// Custom components
import { ProfileFormContainer, ProfileNavigation,
	ProfileDisplayContainer, AvatarContainer } from './container/containers'

// The profile page container component
const Profile = () => (
	<div>
		<ProfileNavigation />
		<div className='ui three column grid'>
			<div className='row'>
				<div className='left-column four wide column'>
					<AvatarContainer />
				</div>
				<div className='mid-column six wide column'>
					<ProfileDisplayContainer />
				</div>
				<div className='right-column six wide column'>
					<ProfileFormContainer />
				</div>
			</div>
		</div>
	</div>
)

export default Profile