import { Action, ArticleFilters } from './articleActions'

const initialArticles = {
	filter: ArticleFilters.SHOW_ALL,
	keyword: '',
	articles: [],
	visibleArticles: [],
	rowNum: 0
}

// helper function to init incoming articles
const decorate = (articles) => articles.map((article) => ({
	...article,
	date: new Date(article.date),
	hide: true
}))

// helper function to sort articles by most recent date
const sort = (articles) => articles.sort((a1, a2) => a2.date - a1.date)

// helper function to filter visible articles based on keyword and filter type
const filter = (articles, filter, keyword) => {
	switch (filter) {
		case ArticleFilters.BY_TEXT:
			const pattern = new RegExp(keyword, 'i')
			return articles.filter((article) => article.text.match(pattern))
		case ArticleFilters.BY_AUTHOR:
			return articles.filter((article) =>
				article.author.toLowerCase() === keyword.toLowerCase())
		default:
			return articles
	}
}

// helper function to remove old articles with the same id as some new articles
// a.k.a remove old articles with outdated content
const filterStale = (articles, newArticles) =>
	articles.filter((a) => !newArticles.find((na) => a._id === na._id))

// helper function to delete articles by a specific author
const del = (articles, author) =>
	articles.filter((article) => article.author !== author)

// helper function to toggle comment hideness of an article
const toggle = (articles, id) =>
	articles.map((article) => {
		if (article._id === id) {
			return {
				...article, hide: !article.hide
			}
		} else {
			return article
		}
	})

// helper function to calculate how many row will the articles occupy in
// a two-column grid
const getRowNum = (articles) => Math.floor((articles.length + 1) / 2)


// Reducer of all article actions
const article = (state = initialArticles, action) => {
	// local variable to hold intermediate values and 
	// avoid duplicate computation
	let articles
	let visibleArticles
	switch (action.type) {
		case Action.SET_ARTICLE_FILTER:
			visibleArticles = filter(state.articles,
				action.filter, action.keyword)
			return {
				...state, 
				filter: action.filter,
				keyword: action.keyword,
				visibleArticles,
				rowNum: getRowNum(visibleArticles)
			}
		case Action.SET_ARTICLES:
			articles = sort(decorate(action.articles))
			visibleArticles = filter(articles, state.filter, state.keyword)
			return {
				...state,
				articles,
				visibleArticles,
				rowNum: getRowNum(visibleArticles)
			}
		case Action.ADD_ARTICLES:
			articles = sort(filterStale(state.articles, action.articles)
				.concat(decorate(action.articles)))
			visibleArticles = filter(articles, state.filter, state.keyword)
			return {
				...state, 
				articles,
				visibleArticles,
				rowNum: getRowNum(visibleArticles)
			}
		case Action.DELETE_ARTICLES:
			articles = del(state.articles, action.author)
			visibleArticles = del(state.visibleArticles, action.author)
			return {
				...state, 
				articles,
				visibleArticles,
				rowNum: getRowNum(visibleArticles)
			}
		case Action.TOGGLE_COMMENTS:
			return {
				...state, 
				articles: toggle(state.articles, action.postId),
				visibleArticles: toggle(state.visibleArticles, action.postId)
			}
		default:
			return state
	}
}

export default article