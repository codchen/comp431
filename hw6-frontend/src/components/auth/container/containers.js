import React from 'react';
import { connect } from 'react-redux'

import Login from './presentational/login'
import Register from './presentational/register'
import Navigation from '../../common/nav'

import { login, register } from './authActions'

// Container of login component
export const LoginContainer = connect((state) => ({ 
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

// Container of landing navigation component
export const LandingNavigation = () => (
	<Navigation
		_id='landingNavigation'
    	btn1={() => <LoginContainer />} 
    	btn2={() => <RegisterContainer />}
	/>)