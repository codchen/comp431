import { resource } from '../../../utils/ajax'
import { updateErrorMessage, updateSuccessMessage, noop } 
	from '../../../actions'

export const Action = {
	SET_ARTICLES: 'SET_ARTICLES',
	ADD_ARTICLES: 'ADD_ARTICLES',
	DELETE_ARTICLES: 'DELETE_ARTICLES',
	SET_ARTICLE_FILTER: 'SET_ARTICLE_FILTER',
	TOGGLE_COMMENTS: 'TOGGLE_COMMENTS'
}

export const ArticleFilters = {
	SHOW_ALL: 'SHOW_ALL',
	BY_TEXT: 'BY_TEXT',
	BY_AUTHOR: 'BY_AUTHOR'
}

// synchronous action creators
export const setArticles = (articles) =>
	({ type: Action.SET_ARTICLES, articles })
export const addArticles = (articles) =>
	({ type: Action.ADD_ARTICLES, articles })
export const deleteArticlesByAuthor = (author) =>
	({ type: Action.DELETE_ARTICLES, author })
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

// async action creators
export const setAllArticles = () =>
	(dispatch) => fetchAllArticles()
		.then((articles) => dispatch(setArticles(articles)))
		.catch((reason) => dispatch(updateErrorMessage(
		`Failed to get articles: ${reason.message}`)))
export const addArticlesByAuthor = (author) =>
	(dispatch) => fetchArticlesByAuthor(author)
		.then((articles) => dispatch(addArticles(articles)))
		.catch((reason) => dispatch(updateErrorMessage(
				`Failed to add articles of ${author}: ${reason.message}`)))
export const postArticle = (text) => {
	if (text === '') {
		return noop()
	}
	return (dispatch) => postNewArticle(text)
		.then((articles) => {
			dispatch(updateSuccessMessage('Article posted successfully'))
			dispatch(addArticles(articles))
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
			dispatch(addArticles(articles))
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
			dispatch(addArticles(articles))
		})
		.catch((reason) => dispatch(updateErrorMessage(
			`Failed to edit comments: ${reason.message}`)))
}

// async requests
const fetchAllArticles = () =>
	resource('GET', 'articles')
		.then((response) => response.articles)
const fetchArticlesByAuthor = (author) =>
	resource('GET', `articles/${author}`)
		.then((response) => response.articles)
const postNewArticle = (text) =>
	resource('POST', 'article', { text })
		.then((response) => response.articles)
const putEditPost = (postId, text) =>
	resource('PUT', `articles/${postId}`, { text })
		.then((response) => response.articles)
const putEditComment = (postId, text, commentId) => 
	resource('PUT', `articles/${postId}`, { text, commentId })
		.then((response) => response.articles)