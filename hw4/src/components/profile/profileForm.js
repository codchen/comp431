import React from 'react'
import { Form, Button, Grid, Message } from 'semantic-ui-react'

// The presentational component to update profile
const ProfileForm = ({ updateError, onUpdateProfile }) => {
	let nameInput
	let emailInput
	let phoneInput
	let zipInput
	let passwordInput
	return (
		<Grid columns={2}>
			<Grid.Row>
				<Grid.Column width={10}>
					<Form>
						<Form.Field>
							<input type='text' placeholder='Display Name'
								ref={ (node) => nameInput=node } />
						</Form.Field>
						<Form.Field>
							<input type='text' placeholder='Email'
								ref={ (node) => emailInput=node } />
						</Form.Field>
						<Form.Field>
							<input type='text' placeholder='Phone'
								ref={ (node) => phoneInput=node } />
						</Form.Field>
						<Form.Field>
							<input type='text' placeholder='Zip'
								ref={ (node) => zipInput=node } />
						</Form.Field>
						<Form.Field>
							<input type='password' placeholder='Password'
								ref={ (node) => passwordInput=node } />
						</Form.Field>
						<Form.Field>
							<Button onClick={(e) => {
								e.preventDefault()
								let info = {}
								if (nameInput.value !== '') {
									info.username = nameInput.value
								}
								if (emailInput.value !== '') {
									info.email = emailInput.value
								}
								if (phoneInput.value !== '') {
									info.phone = phoneInput.value
								}
								if (zipInput.value !== '') {
									info.zip = zipInput.value
								}
								if (passwordInput.value !== '') {
									info.password = passwordInput.value
								}
								onUpdateProfile(info)
							}}>Update</Button>
						</Form.Field>
					</Form>
				</Grid.Column>
				<Grid.Column width={6}>
					{
						updateError !== '' &&
						<Message error header='Update Failed'
							list={[updateError.substring(2)]} />
					}
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default ProfileForm