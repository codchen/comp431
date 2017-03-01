import React from 'react';
import { Button, Card, Image, Form, Header } from 'semantic-ui-react'

// The presentational component for a single followed user
const FollowingUser = ({ followed, onUnfollow }) => {
	return (
		<Card fluid>
			<Card.Content>
				<Image floated='right' size='mini' src={ followed.image } />
				<Card.Header>
					{ followed.username }
				</Card.Header>
				<Card.Description>
					{ followed.headline }
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button basic floated='right' color='red' onClick={ (e) => {
					e.preventDefault()
					onUnfollow(followed.username) 
				} }>Unfollow</Button>
			</Card.Content>
		</Card>
	)
}

// The presentational component for the whole following-users view
const Following = ({ followeds, onUnfollow, onFollow }) => {
	let usernameInput
	return (
		<div>
			<Header as='h1'>Currently following</Header>
			<Card.Group>
				{followeds.map((followed, index) => (
					<FollowingUser key={ index }
						followed={ followed }
						onUnfollow={ onUnfollow } />
				))}
			</Card.Group>
			<br />
			<Form>
					<Form.Field>
						<input type='text' placeholder='New Friend...'
							ref={ (node) => usernameInput = node} />
					</Form.Field>
					<Form.Field>
						<Button basic fluid color='teal' onClick={ (e) => {
							e.preventDefault()
							if (usernameInput.value !== '') {
								onFollow(usernameInput.value)
								usernameInput.value = ''
							}
						} }>Follow!</Button>
					</Form.Field>
			</Form>
		</div>
	)
}

export default Following