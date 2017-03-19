import { Action, ArticleFilters } from './articleActions'

const initialArticles = {
	filter: ArticleFilters.SHOW_ALL,
	keyword: '',
	articles: []
}

//************************************************ //
// pipeline helper pure functions on article array //
//************************************************ //
// Initialize incoming articles' state
// This is always the first process on new article responses
const preprocess = (articles) => articles.map((article) => ({
	...article,
	date: new Date(article.date),
	hideComments: true,
	comments: article.comments.map((comment) => 
		({ ...comment, editing: false }))
}))
// Update existing articles and exclude all articles whose id's are not 
// contained in new articles
const updateInclusive = (newArticles, articles) =>
	newArticles.map((na) => {
		const old = articles.find((a) => na._id === a._id)
		if (old) {
			return {
				...na,
				hideComments: old.hideComments
			}
		} else {
			return na
		}
	}).concat(articles.filter((a) =>
		!newArticles.find((na) => na._id === a._id)))

//************************* //
// display helper functions //
//************************* //
// helper function to toggle comment hideness of an article
const toggleComments = (articles, id) => articles.map(
	(article) => article._id === id ?
		{ ...article, hideComments: !article.hideComments } : article)
// helper function to set if showing edit UI for a specific comment
const showEditing = (articles, postId, commentId, editing) =>
	articles.map((article) => article._id === postId ? { ...article,
		comments: article.comments.map((comment) =>
			comment.commentId === commentId ?
			{ ...comment, editing } : comment) } : article)

//******** //
// Reducer //
//******** //
const article = (state = initialArticles, action) => {
	switch (action.type) {
		case Action.UPDATE_ARTICLES_EXCLUSIVE:
			return { ...state,
				articles: preprocess(action.articles)
			}
		case Action.UPDATE_ARTICLES_INCLUSIVE:
			return { ...state,
				articles: updateInclusive(
					preprocess(action.articles), state.articles)
			}
		case Action.SET_ARTICLE_FILTER:
			return {
				...state, 
				filter: action.filter,
				keyword: action.keyword
			}
		case Action.TOGGLE_COMMENTS:
			return {
				...state, 
				articles: toggleComments(state.articles, action.postId)
			}
		case Action.EDITING_COMMENT:
			return {
				...state,
				articles: showEditing(state.articles, action.postId,
					action.commentId, action.editing)
			}
		default:
			return state
	}
}

export default article