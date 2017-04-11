import { resource } from '../../../utils/ajax'
import { updateErrorMessage, updateSuccessMessage, noop } 
	from '../../../actions'

export const Action = {
	UPDATE_ARTICLES_EXCLUSIVE: 'UPDATE_ARTICLES_EXCLUSIVE',
	UPDATE_ARTICLES_INCLUSIVE: 'UPDATE_ARTICLES_INCLUSIVE',
	SET_ARTICLE_FILTER: 'SET_ARTICLE_FILTER',
	TOGGLE_COMMENTS: 'TOGGLE_COMMENTS',
	EDITING_COMMENT: 'EDITING_COMMENT'
}

export const ArticleFilters = {
	SHOW_ALL: 'SHOW_ALL',
	BY_TEXT: 'BY_TEXT',
	BY_AUTHOR: 'BY_AUTHOR'
}

// synchronous action creators
export const updateArticlesExclusive = (articles) =>
	({ type: Action.UPDATE_ARTICLES_EXCLUSIVE, articles })
export const updateArticlesInclusive = (articles) =>
	({ type: Action.UPDATE_ARTICLES_INCLUSIVE, articles })
export const showAll = () => 
	({ type: Action.SET_ARTICLE_FILTER,
	    filter: ArticleFilters.SHOW_ALL, keyword: '' })
export const searchByText = (keyword) => {
	if (keyword === '') {
		return noop()
	}
	return { type: Action.SET_ARTICLE_FILTER, 
		filter: ArticleFilters.BY_TEXT, keyword }
}
export const searchByAuthor = (keyword) => {
	if (keyword === '') {
		return noop()
	}
	return { type: Action.SET_ARTICLE_FILTER,
		filter: ArticleFilters.BY_AUTHOR, keyword }
}
export const toggleComments = (postId) =>
	({ type: Action.TOGGLE_COMMENTS, postId })
export const editingComment = (postId, commentId, editing) =>
	({ type: Action.EDITING_COMMENT, postId, commentId, editing })

// async action creators
export const setAllArticles = () =>
	(dispatch) => fetchAllArticles()
		.then((articles) => dispatch(updateArticlesExclusive(articles)))
		.catch((reason) => dispatch(updateErrorMessage(
		`Failed to get articles: ${reason.message}`)))
export const postArticle = (text, image) => {
	if (text === '') {
		return noop()
	}
	return (dispatch) => postNewArticle(text, image)
		.then((articles) => {
			dispatch(updateSuccessMessage('Article posted successfully'))
			dispatch(updateArticlesInclusive(articles))
		})
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to post article: ${reason.message}`)))
}
export const editPost = (postId, text) => {
	if (text === '') {
		return noop()
	}
	return (dispatch) => putEditPost(postId, text)
		.then((articles) => {
			dispatch(updateSuccessMessage('Article edit successful'))
			dispatch(updateArticlesInclusive(articles))
		})
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to edit articles: ${reason.message}`)))
}
export const editComment = (postId, text, commentId) => {
	if (text === '') {
		return noop()
	}
	return (dispatch) => putEditComment(postId, text, commentId)
		.then((articles) => {
			dispatch(updateSuccessMessage('Comment edit successful'))
			dispatch(updateArticlesInclusive(articles))
		})
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to edit comments: ${reason.message}`)))
}

// async requests
const fetchAllArticles = () =>
	resource('GET', 'articles')
		.then((response) => response.articles)
const postNewArticle = (text, image) => {
	if (image) {
		return resource('POST', 
			'article', { message: text, file: image }, true)
			.then((response) => response.articles)
	} else {
		return resource('POST', 'article', { text })
			.then((response) => response.articles)
	}
}
const putEditPost = (postId, text) =>
	resource('PUT', `articles/${postId}`, { text })
		.then((response) => response.articles)
const putEditComment = (postId, text, commentId) => 
	resource('PUT', `articles/${postId}`, { text, commentId })
		.then((response) => response.articles)