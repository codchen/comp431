import React from 'react';
import { Item } from 'semantic-ui-react'
import { logo } from '../../assets'

// The presentational component for bullet-points on landing page
const Bullets = () => (
	<Item.Group relaxed className='bullets'>
		<Item>
			<Item.Image size='tiny' src={ logo } />

			<Item.Content>
				<Item.Header>{ 'Stalk other squirrels!' }</Item.Header>
				<Item.Description>
					{ 'Follow your friends to see what they are up to' }
				</Item.Description>
			</Item.Content>
		</Item>
		<Item>
			<Item.Image size='tiny' src={ logo } />

			<Item.Content>
				<Item.Header>{ 'Got this new pinecone!' }</Item.Header>
				<Item.Description>
					{ 'Write about what you are doing' }
				</Item.Description>
			</Item.Content>
		</Item>
	</Item.Group>)

export default Bullets