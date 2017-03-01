import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import Article from './article'
import NewArticle from './newArticle'
import SearchArticle from './searchArticle'
import { setArticleFilter, postArticle } from '../../actionCreators'
import { ArticleFilters } from '../../actions'

// The actual filtering process
const getVisibleArticles = (articles, filter, keyword) => {
	switch (filter) {
		case ArticleFilters.SHOW_ALL:
			return articles.sort((a1, a2) => a2.date - a1.date)
		case ArticleFilters.BY_AUTHOR:
			return articles.filter((article) => article.author === 
				keyword).sort((a1, a2) => a2.date - a1.date)
		case ArticleFilters.BY_TEXT:
			return articles.filter((article) => article.text.search(keyword)
				!== -1).sort((a1, a2) => a2.date - a1.date)
		default:
			return articles.sort((a1, a2) => a2.date - a1.date)
	}
}

// Define a temporary presentational component to display articles in a
// 2-column grid
// Bind state and actions to that presentational components
const SocialAppArticles = connect(
	(state) => {
		return { articles: getVisibleArticles(state.article.articles,
			state.article.filter, state.article.keyword) }
	}
)(({articles}) => {
	const articleCards = articles.map((article) => (
			<Article key={ article.articleID } article={ article } />))
	const rowNum = Math.floor((articles.length + 1) / 2)
	return (
		<Grid columns={2}>
			{
				[...Array(rowNum)].map((x, i) => (
					<Grid.Row key={i}>
						<Grid.Column>
							{ articleCards[2 * i] }
						</Grid.Column>
						<Grid.Column>
							{
								2 * i + 1 < articles.length &&
								articleCards[2 * i + 1]
							}
						</Grid.Column>
					</Grid.Row>
				))
			}
		</Grid>
	)
})

// Bind state and actions to the new-article presentational components
const SocialAppNewArticle = connect(
	(state) => {
		return { author: state.profile.username }
	},
	(dispatch) => {
		return { onPostArticle: (author, article) => 
			dispatch(postArticle(author, article)) }
	}
)(NewArticle)

// Bind state and actions to the search-article presentational components
const SocialAppSearchArticle = connect(
	null,
	(dispatch) => {
		return { onSearch: (query, filter) => 
			dispatch(setArticleFilter(filter, query)) }
	}
)(SearchArticle)

// The main article container view
const ArticlesView = () => (
	<div>
		<SocialAppNewArticle />
		<SocialAppSearchArticle />
		<SocialAppArticles />
	</div>
)

export default ArticlesView