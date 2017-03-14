import React from 'react'
import { connect } from 'react-redux'

import ProfileForm from './presentational/profileForm'
import ProfileDisplay from './presentational/profileDisplay'
import Avatar from './presentational/avatar'
import Navigation from '../../common/nav'

import { updateEmail, updateZipcode, updatePassword } from './profileActions'
import { updateAvatar } from '../../main/container/homeActions'
import { logout } from '../../auth/container/authActions'
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

// Container of profile page navigation component
export const ProfileNavigation = connect(null, (dispatch) => ({
	btn1: () => (<button className='ui blue basic button btnNav'
				onClick={ () => dispatch(logout()) }>
				{ 'Log out' }
			</button>),
	btn2: () => (<button className='ui blue basic button btnNav'
				onClick={ () => dispatch(toMain()) }>
				{ 'Main' }
		 	</button>)
}))(Navigation)