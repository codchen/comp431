import { expect } from 'chai'
import { createStore } from 'redux'

import article from '../../src/components/article/container/articleReducer'
import { Action, ArticleFilters }
	from '../../src/components/article/container/articleActions'


describe('Validate Article reducer', () => {
	const articles = [
		{
			_id: 0,
			author: 'Tony',
			comments: [],
			date: new Date('02/01/1999'),
			img: 'dummy',
			text: '123',
			hide: true
		}, {
			_id: 1,
			author: 'Seb',
			comments: [],
			date: new Date('01/01/1980'),
			img: '',
			text: '456',
			hide: true
		}
	]

	const newArticle = [
		{
			_id: 2,
			author: 'Alice',
			comments: [],
			date: new Date('03/01/1975'),
			img: 'lala',
			text: '789',
			hide: true
		}
	]

	const textKeyword = '1'
	const authorKeyword = 'Seb'

	const store = createStore(article)
	it('should set the articles', (done) => {
		store.dispatch({ type: Action.SET_ARTICLES, articles })
		expect(store.getState().articles).to.eql(articles)
		done()
	})

	it('should set the search keyword', (done) => {
		store.dispatch({ type: Action.SET_ARTICLE_FILTER,
			filter: ArticleFilters.BY_TEXT, keyword: textKeyword })
		expect(store.getState().keyword).to.eql(textKeyword)
		expect(store.getState().filter).to.eql(ArticleFilters.BY_TEXT)
		store.dispatch({ type: Action.SET_ARTICLE_FILTER,
			filter: ArticleFilters.BY_AUTHOR, keyword: authorKeyword })
		expect(store.getState().keyword).to.eql(authorKeyword)
		expect(store.getState().filter).to.eql(ArticleFilters.BY_AUTHOR)
		done()
	})

	it('should filter displayed articles by the search keyword', (done) => {
		store.dispatch({ type: Action.SET_ARTICLE_FILTER, 
			filter: ArticleFilters.BY_TEXT, keyword: textKeyword })
		expect(store.getState().visibleArticles).to.eql([articles[0]])
		done()
	})

	it('should set newly added article', (done) => {
		store.dispatch({ type: Action.ADD_ARTICLES, articles: newArticle })
		expect(store.getState().articles).to.eql(articles.concat(newArticle))
		done()
	})

	it('should remove deleted article', (done) => {
		store.dispatch({ type: Action.DELETE_ARTICLES, author: 'Alice' })
		expect(store.getState().articles).to.eql(articles)
		done()
	})

	it('should set comments hiding/showing', (done) => {
		store.dispatch({ type: Action.TOGGLE_COMMENTS, postId: 0 })
		expect(store.getState().articles[0].hide).to.eql(false)
		done()
	})
})