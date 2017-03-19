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
				<div className='four wide column left-column'>
					<AvatarContainer />
				</div>
				<div className='six wide column mid-column'>
					<ProfileDisplayContainer />
				</div>
				<div className='six wide column right-column'>
					<ProfileFormContainer />
				</div>
			</div>
		</div>
	</div>
)

export default Profile