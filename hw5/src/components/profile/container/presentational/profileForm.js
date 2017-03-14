import React from 'react'

// The presentational component to update profile
const ProfileForm = ({ onEmail, onZipcode, onPassword }) => {
	let emailInput
	let zipInput
	let passwordInput
	return (
		<form className='ui form'>
			<div className='field'>
				<input type='text' placeholder='Email'
					ref={ (node) => emailInput=node } />
				<button className='ui button' onClick={(e) => {
					e.preventDefault()
					onEmail(emailInput.value)
					emailInput.value = ''
				}}>Update</button>
			</div>
			<div className='field'>
				<input type='text' placeholder='Zip'
					ref={ (node) => zipInput=node } />
				<button className='ui button' onClick={(e) => {
					e.preventDefault()
					onZipcode(zipInput.value)
					zipInput.value = ''
				}}>Update</button>
			</div>
			<div className='field'>
				<input type='password' placeholder='Password'
					ref={ (node) => passwordInput=node } />
				<button className='ui button' onClick={(e) => {
					e.preventDefault()
					onPassword(passwordInput.value)
					passwordInput.value = ''
				}}>Update</button>
			</div>
		</form>
	)
}

ProfileForm.propTypes = {
	onEmail: React.PropTypes.func.isRequired,
	onZipcode: React.PropTypes.func.isRequired,
	onPassword: React.PropTypes.func.isRequired
}

export default ProfileForm