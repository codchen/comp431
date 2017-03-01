import React from 'react';
import { Form, Button, Select } from 'semantic-ui-react'
import * as Actions from '../../actions'

// The presentational component to search articles
const SearchArticle = ({ onSearch }) => {
	let searchInput
	let currentFilter = Actions.ArticleFilters.SHOW_ALL
	const options = [
	    { key: 'all', text: 'All', value: Actions.ArticleFilters.SHOW_ALL },
	    { key: 'articles', text: 'By Text',
	    	value: Actions.ArticleFilters.BY_TEXT },
	    { key: 'products', text: 'By Author',
	    	value: Actions.ArticleFilters.BY_AUTHOR },
	]
	return (
		<Form>
			<Form.Group inline>
				<Form.Field>
					<input type='text' placeholder='Search posts...'
						ref={ (node) => searchInput = node } />
				</Form.Field>
				<Form.Field>
					<Select options={options}
						defaultValue={Actions.ArticleFilters.SHOW_ALL}
						onChange={(_, data) => currentFilter = data.value} />
				</Form.Field>
				<Form.Field>
					<Button onClick={(e) => {
						e.preventDefault()
						if (currentFilter === Actions.ArticleFilters.SHOW_ALL
								|| searchInput.value !== '') {
							onSearch(searchInput.value, currentFilter)
						}
					}}>Search</Button>
				</Form.Field>
			</Form.Group>
		</Form>
	)
}

export default SearchArticle