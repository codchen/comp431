import React from 'react';
import { Modal } from 'semantic-ui-react'

// A modal to let user log in to his/her account
const Login = ({ loading, onLoginClick }) => {
	let username
	let password
	return (
		<Modal className='auth-modal' trigger={
			<button className='ui blue basic button btnNav'>
				{ 'Log in' }
			</button>
		}>
			<div className='ui header'>
				<i className='sign in icon' />
				Time to catch up!
			</div>
			<br />
		    <form className='ui form'>
		      	<div className='field authenticationBlock'>
					<input type='text' placeholder='Username'
						ref={ (node) => username = node } />
				</div>
				<div className='field authenticationBlock'>
					<input type='password' placeholder='Password'
						ref={ (node) => password = node } />
				</div>
		    </form>
		    <br />
		    <button className={ loading ?
		    	'ui loading primary disabled button btn' :
		    	'ui primary button btn'}
		    	onClick={ (e) => {
					e.preventDefault()
					onLoginClick(username.value, password.value)
					password.value = ''
				} }>{ 'Log in' }</button>
		</Modal>
	)
}

Login.propTypes = {
	loading: React.PropTypes.bool,
	onLoginClick: React.PropTypes.func.isRequired
}

export default Login