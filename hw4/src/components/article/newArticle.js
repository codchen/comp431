import React from 'react'
import { Form, Button } from 'semantic-ui-react'

// The presentational component for posting new articles
const NewArticle = ({ author, onPostArticle }) => {
	let newArticleInput
	return (
		<Form>
			<Form.Field>
				<textarea placeholder='New Article'
					ref={ (node) => newArticleInput = node} />
			</Form.Field>
			<Form.Group inline>
				<Form.Field>
					<Button primary onClick={ (e) => {
							e.preventDefault()
							if (newArticleInput.value === '') {
								return
							}
							onPostArticle(author, newArticleInput.value)
							newArticleInput.value = ''
						} 
					}>Post</Button>
				</Form.Field>
				<Form.Field>
					<Button onClick={ (e) => {
						e.preventDefault()
						newArticleInput.value = '' 
					} }>
						Cancel
					</Button>
				</Form.Field>
			</Form.Group>
		</Form>
	)
}

export default NewArticle