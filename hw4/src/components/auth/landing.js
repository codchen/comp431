import React from 'react';
import { connect } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'
import Bullets from './bullets'
import Login from './login'
import Register from './register'
import { changeLocation, login, register,
    clearError, toggleLanding } from '../../actionCreators'
import { Locations, ERROR } from '../../actions'
import { navLogo } from '../../assets'

// Bind state and actions to the login presentational component
const SocialAppLogin = connect((state) => {
    return {
        loginError: state.error.loginError
    }
}, (dispatch) => {
    return {
        onLoginClick: (username, password) => {
            const action = login(username, password)
            dispatch(action)
            if (action.type !== ERROR) {
                dispatch(clearError())
                dispatch(changeLocation(Locations.MAIN_PAGE))
            }
        }
    }
})(Login)

// Bind state and actions to the register presentational component
const SocialAppRegister = connect((state) => {
    return {
        registerError: state.error.registerError
    }
}, (dispatch) => {
    return {
        onRegisterClick: (info) => {
            const action = register(info)
            dispatch(action)
            if (action.type !== ERROR) {
                dispatch(clearError())
                dispatch(changeLocation(Locations.MAIN_PAGE))
            }
        }
    }
})(Register)

// The landing presentational component
const Landing = ({ registerPage, onToggle }) => {
    return (
        <div className='landingBackground'>
            <nav>
                <img className='inlineImg'
                    src={ navLogo } />
                <Button className='btnNav' basic color='blue' onClick={
                    (e) => {
                        e.preventDefault()
                        onToggle()
                    }
                }>{ registerPage ? 'Log in' : 'Register' }</Button>
            </nav>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Bullets />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        {
                            registerPage && <SocialAppRegister/>
                        }
                        {
                            !registerPage && <SocialAppLogin />
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

// Bind state and actions to the landing presentational component
// The main landing container component
const SocialAppLanding = connect(
    (state) => {
        return {
            registerPage: state.page.onRegister
        }
    }, (dispatch) => {
        return {
            onToggle: () => dispatch(toggleLanding())
        }
    })(Landing)

export default SocialAppLanding