import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import ProfileDisplay from './profileDisplay'
import Avatar from './avatar'
import ProfileForm from './profileForm'
import Navigation from '../nav'
import { updateInfo, changeLocation,
	logout, clearError } from '../../actionCreators'
import { Locations, ERROR } from '../../actions'

// Bind state and actions to the avatar presentational component
const SocialAppAvatar = connect(
	(state) => { 
		return { image: state.profile.image }
	})(Avatar)

// Bind state and actions to the profile-display presentational component
const SocialAppProfileDisplay = connect(
	(state) => { 
		return { profile: {username: state.profile.username,
						   email: state.profile.email,
						   phone: state.profile.phone,
						   birthday: state.profile.birthday,
						   zip: state.profile.zip} }
})(ProfileDisplay)

// Bind state and actions to the profile-update presentational component
const SocialAppProfileForm = connect(
	(state) => {
		return {
			updateError: state.error.updateError
		}
	}, (dispatch) => {
		return {
			onUpdateProfile: (info) => {
				const action = updateInfo(info)
				dispatch(action)
				if (action.type !== ERROR) {
					dispatch(clearError())
				}
			}
		}
	}
)(ProfileForm)

// Bind state and actions to the navigation presentational component
const SocialAppProfileNavigation = connect(
	(state) => {
		return { username: state.profile.username,
				 location: state.page.location }
	},
	(dispatch) => {
		return {
			onLogout: () => {
				dispatch(logout())
				dispatch(clearError())
				dispatch(changeLocation(Locations.LANDING_PAGE))
			},
			onToMain: () => {
				dispatch(clearError())
				dispatch(changeLocation(Locations.MAIN_PAGE))
			}
		}
	}
)(Navigation)

// The profile page container component
const Profile = () => (
	<div>
		<SocialAppProfileNavigation />
		<Grid columns={3}>
			<Grid.Row>
				<Grid.Column width={4} className='left-column'>
					<SocialAppAvatar />
				</Grid.Column>
				<Grid.Column width={6} className='mid-column'>
					<SocialAppProfileDisplay />
				</Grid.Column>
				<Grid.Column width={6} className='right-column'>
					<SocialAppProfileForm />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</div>
)

export default Profile