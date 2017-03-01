import React from 'react'
import StylizedFileInput from '../stylizedFileInput'
import { Button, Card, Image, Form, Header, Grid } from 'semantic-ui-react'

// The presentational view for displaying headline and profile images
const Headline = ({ username, headline, image, onUpdate }) => {
	let headlineInput
	return (
		<Card fluid>
			<Card.Content>
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column width={3}>
							<Image centered size='small' src={ image } />
						</Grid.Column>
						<Grid.Column width={13}>
							<Header as='h1'>
								{ username }
							</Header>
							<Card.Description>
								{ headline }
							</Card.Description>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Card.Content>
			<Card.Content extra>
				<Form>
					<Form.Field>
						<label>Update your profile photo here</label>
						<StylizedFileInput />
					</Form.Field>
					<Form.Field>
						<input type='text' 
							placeholder='Something else for your headline?'
							ref={ (node) => headlineInput = node} />
						<Button basic fluid color='teal' onClick={ (e) => {
							e.preventDefault()
							if (headlineInput.value !== '') {
								onUpdate(headlineInput.value)
							}
						} }>
							Update Headline
						</Button>
					</Form.Field>
				</Form>
			</Card.Content>
		</Card>
	)
}

export default Headline