import React from 'react'
import { connect } from 'react-redux'

import ArticleExtraContainer from './articleExtraContainer'

import NewArticle from './presentational/newArticle'
import SearchArticle from './presentational/searchArticle'
import Articles from './presentational/articles'

import { postArticle, showAll, searchByText, searchByAuthor }
	from './articleActions'

// Container of new article component
export const NewArticleContainer = connect(
	null,
	(dispatch) => {
		return { onPostArticle: (text) => dispatch(postArticle(text)) }
	}
)(NewArticle)

// Container of search article component
export const SearchArticleContainer = connect(
	null,
	(dispatch) => ({
		options: [
		    { text: 'All Articles', callback:
		    	() => dispatch(showAll()) },
		    { text: 'By Text', callback:
		    	(text) => dispatch(searchByText(text)) },
		    { text: 'By Author', callback: 
		    	(author) => dispatch(searchByAuthor(author)) }
		]
	}
))(SearchArticle)

// Wrapper of the above two and the extra container
const ArticlesContainer = connect(
	(state) => {
		return { 
			articles: state.article.visibleArticles,
			rowNum: state.article.rowNum,
			articleExtra: ArticleExtraContainer
		}
	})(Articles)

export default ArticlesContainer