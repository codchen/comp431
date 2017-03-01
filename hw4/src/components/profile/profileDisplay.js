import React from 'react'
import { Segment, Header } from 'semantic-ui-react'

// The presentational component for displaying current profile
const ProfileDisplay = ({ profile }) => {
	return (
		<Segment.Group>
			<Segment>
				<Header as='h3'>Current Info</Header>
			</Segment>
			<Segment.Group horizontal>
				<Segment><b>Display Name</b></Segment>
				<Segment>{ profile.username }</Segment>
			</Segment.Group>
			<Segment.Group horizontal>
				<Segment><b>Email</b></Segment>
				<Segment>{ profile.email }</Segment>
			</Segment.Group>
			<Segment.Group horizontal>
				<Segment><b>Phone Number</b></Segment>
				<Segment>{ profile.phone }</Segment>
			</Segment.Group>
			<Segment.Group horizontal>
				<Segment><b>Birthday</b></Segment>
				<Segment>{ profile.birthday }</Segment>
			</Segment.Group>
			<Segment.Group horizontal>
				<Segment><b>Zipcode</b></Segment>
				<Segment>{ profile.zip }</Segment>
			</Segment.Group>
		</Segment.Group>
	)
}

export default ProfileDisplay