import React from 'react'
import { connect } from 'react-redux'

import ProfileForm from './presentational/profileForm'
import ProfileDisplay from './presentational/profileDisplay'
import Avatar from './presentational/avatar'
import Navigation from '../../common/nav'
import Login from '../../auth/container/presentational/login'

import { updateEmail, updateZipcode, updatePassword } from './profileActions'
import { updateAvatar } from '../../main/container/homeActions'
import { logout, link, unlink } from '../../auth/container/authActions'
import { toMain } from '../../../actions'

// Container of profile update component
export const ProfileFormContainer = connect(null, (dispatch) => ({
	onEmail: (email) => dispatch(updateEmail(email)),
	onZipcode: (zipcode) => dispatch(updateZipcode(zipcode)),
	onPassword: (password) => dispatch(updatePassword(password))
}))(ProfileForm)

// Container of profile display component
export const ProfileDisplayContainer = connect((state) => ({
	profile: {
		username: state.auth.username,
	   email: state.profile.email,
	   birthday: state.profile.dob,
	   zip: state.profile.zipcode
}}))(ProfileDisplay)

// Container of avatar component
export const AvatarContainer = connect(
	(state) => ({ image: state.home.avatar }),
	(dispatch) => ({ onAvatar: (file) => dispatch(updateAvatar(file))})
)(Avatar)

const LinkAccountBtn = connect((state) => {
	const parts = state.auth.username.split('@')
	const type = parts.length > 1 ? parts[1] : 'native'
	return { type, loading: state.auth.loginLoading }
}, (dispatch) => ({
    onLoginClick: (username, password) => dispatch(link(username, password))
}))(({ type, loading, onLoginClick }) => {
	if (type === 'native') {
		return (
			<button className='ui blue basic button btnNav'
				onClick={ () => {
					window.location = 'https://squirrelspace-backend.herokuapp.com/auth/google'
				}}>{ 'Link with Google' }
			</button>
		)
	} else {
		return  (
			<Login text={ 'Link with SquirrelSpace' }
				loading={ loading } onLoginClick={ onLoginClick } />
		)
	}
})

// Container of profile page navigation component
export const ProfileNavigation = connect((state) => ({
	linked: state.auth.links.length > 0
}), (dispatch) => ({
	btn1: () => (<button className='ui blue basic button btnNav'
				id='logout'
				onClick={ () => dispatch(logout()) }>
				{ 'Log out' }
			</button>),
	btn2: () => (<button className='ui blue basic button btnNav'
				onClick={ () => dispatch(toMain()) }>
				{ 'Main' }
		 	</button>),
	toLink: () => <LinkAccountBtn />,
	toUnlink: () => <button className='ui blue basic button btnNav'
				onClick={ () => {
					dispatch(unlink('google'))
				}}>{ 'Unlink with Google' }
			</button>
}))(({ linked, btn1, btn2, toLink, toUnlink }) => (
	<Navigation _id='profileNavigation' btn1={ btn1 } btn2={ btn2 } btn3={ linked ? toUnlink : toLink } />
))