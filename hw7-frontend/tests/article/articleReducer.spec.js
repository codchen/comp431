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
			comments: [{
				commentId: 0,
				editing: false
			}, {
				commentId: 1,
				editing: false
			}],
			date: new Date('02/01/1999'),
			img: 'dummy',
			text: '123',
			hideComments: true
		}, {
			_id: 1,
			author: 'Seb',
			comments: [],
			date: new Date('01/01/1980'),
			img: '',
			text: '456',
			hideComments: true
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
			hideComments: true
		}
	]

	const textKeyword = '1'
	const authorKeyword = 'Seb'

	const store = createStore(article)
	it('should set the articles', (done) => {
		store.dispatch({ type: Action.UPDATE_ARTICLES_EXCLUSIVE, articles })
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

	it('should set newly added article inclusively', (done) => {
		store.dispatch({ type: Action.UPDATE_ARTICLES_INCLUSIVE,
			articles: newArticle })
		expect(store.getState().articles).to.eql(newArticle.concat(articles))
		done()
	})

	it('should update new article', (done) => {
		store.dispatch({ type: Action.UPDATE_ARTICLES_INCLUSIVE,
			articles: newArticle })
		expect(store.getState().articles).to.eql(newArticle.concat(articles))
		done()
	})

	it('should set comments hiding/showing', (done) => {
		store.dispatch({ type: Action.TOGGLE_COMMENTS, postId: 0 })
		expect(store.getState().articles.find((article) => article._id === 0)
			.hideComments).to.eql(false)
		done()
	})

	it('should set comments edit hiding/showing', (done) => {
		store.dispatch({ type: Action.EDITING_COMMENT, postId: 0,
			 commentId: 0, editing: true })
		expect(store.getState().articles.find((article) => 
			article._id === 0).comments.find((comment) => 
				comment.commentId === 0).editing).to.eql(true)
		done()
	})
})