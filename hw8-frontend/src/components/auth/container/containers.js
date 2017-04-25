import React from 'react';
import { connect } from 'react-redux'

import Login from './presentational/login'
import Register from './presentational/register'
import Navigation from '../../common/nav'

import { login, register } from './authActions'

// Container of login component
export const LoginContainer = connect((state) => ({
	text: 'Log in',
	loading: state.auth.loginLoading }
), (dispatch) => ({
    onLoginClick: (username, password) => dispatch(login(username, password))
}))(Login)

// Container of register component
export const RegisterContainer = connect((state) => ({
    loading: state.auth.regLoading
}), (dispatch) => ({
    onRegisterClick: (info) => dispatch(register(info))
}))(Register)

export const GoogleLogin = () => (
	<button className='ui blue basic button btnNav'
		onClick={
			(e) => {
				e.preventDefault()
				window.location = 'https://squirrelspace-backend.herokuapp.com/auth/google'
			}
		}>
		{
			'Log in with Google'
		}
	</button>
)

// Container of landing navigation component
export const LandingNavigation = () => (
	<Navigation
		_id='landingNavigation'
    	btn1={() => <LoginContainer />} 
    	btn2={() => <RegisterContainer />}
    	btn3={GoogleLogin}
	/>)