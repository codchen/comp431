import React from 'react';
import { Button, Form, Header, Icon, Grid, Message } from 'semantic-ui-react'

// The presentational component for registration
const Register = ({ registerError, onRegisterClick }) => {
	let usernameInput
	let passwordInput
	let emailInput
	let phoneInput
	let birthdayInput
	let zipInput
	return (
		<Grid columns={2}>
			<Grid.Row>
				<Grid.Column width={6} >
					{
						registerError !== '' &&
						<Message className='errorMsgReg'
							error header='Registration Failed'
							list={[registerError.substring(2)]} />
					}
				</Grid.Column>
				<Grid.Column width={10}>
					<Form className='authenticationBlock'>
						<Header textAlign='center'>
							<Icon name='signup' />
							Sign up now for a FREE account!
						</Header>
						<Form.Field className='authenticationInput' >
							<input type='text' placeholder='Username'
								ref={ (node) => usernameInput = node} />
						</Form.Field>
						<Form.Field className='authenticationInput' >
							<input type='password' placeholder='Password'
								ref={ (node) => passwordInput = node} />
						</Form.Field>
						<Form.Field className='authenticationInput' >
							<input type='text' placeholder='Email'
								ref={ (node) => emailInput = node} />
						</Form.Field>
						<Form.Field className='authenticationInput' >
							<input type='text' placeholder='Phone'
								ref={ (node) => phoneInput = node} />
						</Form.Field>
						<Form.Field className='authenticationInput' >
							<input type='text' placeholder='Birthday'
								ref={ (node) => birthdayInput = node} />
						</Form.Field>
						<Form.Field className='authenticationInput' >
							<input type='text' placeholder='Zip'
								ref={ (node) => zipInput = node} />
						</Form.Field>
						<Button primary className='btn' onClick={
							(e) => {
								e.preventDefault()
								let userInfo = {
									username: usernameInput.value,
									password: passwordInput.value,
									email: emailInput.value,
									phone: phoneInput.value,
									birthday: birthdayInput.value,
									zip: zipInput.value
								}
								onRegisterClick(userInfo)
							}
						}>
							Register</Button>
						<br />
					</Form>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default Register