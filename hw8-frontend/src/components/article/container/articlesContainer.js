import React from 'react'
import { connect } from 'react-redux'

import ArticleCommentsContainer from './articleCommentsContainer'

import NewArticle from './presentational/newArticle'
import SearchArticle from './presentational/searchArticle'
import EditArticle from './presentational/editArticle'
import Articles from './presentational/articles'

import * as actions
	from './articleActions'

// Derived data
const mapVisibleArticles = ({ articles, filter, keyword }) =>
	articles.filter((a) => filter === actions.ArticleFilters.SHOW_ALL ||
		(filter === actions.ArticleFilters.BY_TEXT && 
			a.text.toLowerCase().includes(keyword.toLowerCase())) ||
		(filter === actions.ArticleFilters.BY_AUTHOR && 
			a.author.toLowerCase() === keyword.toLowerCase()))
const mapSortedArticles = (articles) =>
	articles.sort((a1, a2) => a2.date - a1.date)

// Container of new article component
export const NewArticleContainer = connect(
	null,
	(dispatch) => {
		return { onPostArticle: (text, image) => 
			dispatch(actions.postArticle(text, image)) }
	}
)(NewArticle)

// Container of search article component
export const SearchArticleContainer = connect(
	null,
	(dispatch) => ({
		options: [
		    { text: 'All Articles', callback:
		    	() => dispatch(actions.showAll()) },
		    { text: 'By Text', callback:
		    	(text) => dispatch(actions.searchByText(text)) },
		    { text: 'By Author', callback: 
		    	(author) => dispatch(actions.searchByAuthor(author)) }
		]
	}
))(SearchArticle)

// Wrapper of the above two and the extra container
const ArticlesContainer = connect(
	(state) => {
		return { 
			username: state.auth.username,
			articles: mapSortedArticles(mapVisibleArticles(state.article)),
			Comments: ArticleCommentsContainer
		}
	}, (dispatch) => {
		return {
			EditArticle: ({id, text}) => (
					<EditArticle id={ id } text={ text } 
						onEditArticle={ (id, text) => 
							dispatch(actions.editPost(id, text)) } />
				)
		}
	})(Articles)

export default ArticlesContainer