import React from 'react';
import { Modal } from 'semantic-ui-react'

// helper function to extra values from an input DOM object into
// an input value object
const extract = (input) => ({
	username: input.username.value,
	password: input.password.value,
	email: input.email.value,
	dob: input.dob.value,
	zipcode: input.zipcode.value
})

// A modal to let use register a new account
const Register = ({ loading, onRegisterClick }) => {
	const input = {}
	return (
		<Modal className='auth-modal' trigger={
			<button className='ui blue button btnNav'>{ 'Sign up' }</button>
		}>
			<div className='ui header'>
				<i className='signup icon' />
				Sign up now for a FREE account!
			</div>
			<br />
		    <form className='ui form'>
		      	<div className='field authenticationBlock'>
					<input type='text' placeholder='Username'
						ref={ (node) => input.username = node } />
				</div>
				<div className='field authenticationBlock'>
					<input type='password' placeholder='Password'
						ref={ (node) => input.password = node } />
				</div>
				<div className='field authenticationBlock'>
					<input type='text' placeholder='Email'
						ref={ (node) => input.email = node } />
				</div>
				<div className='field authenticationBlock'>
					<input type='text' placeholder='Birthday'
						ref={ (node) => input.dob = node } />
				</div>
				<div className='field authenticationBlock'>
					<input type='text' placeholder='Zip'
						ref={ (node) => input.zipcode = node } />
				</div>
		    </form>
		    <br />
		    <button 
		    	className={ loading ?
		    	'ui loading primary disabled button btn' :
		    	'ui primary button btn'}
		    	onClick={
				(e) => {
					e.preventDefault()
					onRegisterClick(extract(input))
				}
			}>{ 'Sign up' }</button>
		</Modal>
	)
}

Register.propTypes = {
	loading: React.PropTypes.bool,
	onRegisterClick: React.PropTypes.func.isRequired
}

export default Register