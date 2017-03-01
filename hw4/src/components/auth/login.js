import React from 'react';
import { Button, Form, Icon, Header, Grid, Message } from 'semantic-ui-react'

// The presentational component for login
const Login = ({ loginError, onLoginClick }) => {
	let usernameInput
	let passwordInput
	return (
		<Grid columns={2}>
			<Grid.Row>
				<Grid.Column width={6} >
					{
						loginError !== '' &&
						<Message className='errorMsgReg'
							error header='Log in Failed'
							list={[loginError.substring(2)]} />
					}
				</Grid.Column>
				<Grid.Column width={10}>
					<Form className='authenticationBlock'>
						<Header textAlign='center'>
							<Icon name='sign in' />
							Time to catch up!
						</Header>
						<Form.Field className='authenticationInput'>
							<input type='text' placeholder='Username'
								ref={ (node) => usernameInput = node} />
						</Form.Field>
						<Form.Field className='authenticationInput'>
							<input type='password' placeholder='Password'
								ref={ (node) => passwordInput = node} />
						</Form.Field>
						<Button primary className='btn' onClick={
							(e) => {
								e.preventDefault()
								onLoginClick(usernameInput.value,
									passwordInput.value) }
							}>
							Log in</Button>
					</Form>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default Login