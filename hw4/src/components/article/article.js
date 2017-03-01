import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'

// The article (or card) presentational component
const Article = ({ article }) => {
	return (
		<Card fluid>
			{article.image &&
				<Image size='big' src={ article.image } />}
			<Card.Content>
				<Card.Header>
					{ article.author }
				</Card.Header>
				<Card.Meta>
			        <span className='date'>
			            { article.date.toJSON() }
			        </span>
			    </Card.Meta>
			    <Card.Description>
			    	{ article.text }
			    </Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button onClick={ (e) => e.preventDefault() }>Edit</Button>
				<Button onClick={ (e) => e.preventDefault() }>Comment</Button>
			</Card.Content>
		</Card>
	)
}

export default Article