import React from 'react'
import { expect } from 'chai'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import dummy from '../dummyReducer'
import { url } from '../../src/utils/ajax'
import fetch, { mock } from 'mock-fetch'

import * as actions
    from '../../src/components/article/container/articleActions'
import { Action, MessageTypes } from '../../src/actions'

describe('Validate Article asyncronous actions', () => {
    const articles = [
        {
            _id: 0,
            author: 'Tony',
            comments: [],
            date: '',
            img: '',
            text: '123'
        }, {
            _id: 1,
            author: 'Seb',
            comments: [],
            date: '',
            img: '',
            text: '456'
        }
    ]
    const author = 'Tony'
    const articlesByAuthor = [articles[0]]

    const store = createStore(dummy, applyMiddleware(thunkMiddleware))

	beforeEach(() => {
        global.fetch = fetch
    })

	it('should fetch articles', (done) => {
    	mock(`${url}/articles`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: {
            	articles
            }
        })

        store.dispatch(actions.setAllArticles())
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.SET_ARTICLES)
                expect(store.getState().articles).to.eql(articles)
            })
            .then(done)
            .catch(done)
    })

    it('should fetch articles of a specific author', (done) => {
        mock(`${url}/articles/${author}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: {
                articles: articlesByAuthor
            }
        })

        store.dispatch(actions.addArticlesByAuthor(author))
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.ADD_ARTICLES)
                expect(store.getState().articles).to.eql(articlesByAuthor)
            })
            .then(done)
            .catch(done)
    })

    it('should post new articles', (done) => {
        mock(`${url}/article`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            json: {
                articles: articlesByAuthor
            }
        })

        store.dispatch(actions.postArticle('unused'))
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.ADD_ARTICLES)
                expect(store.getState().articles).to.eql(articlesByAuthor)
            })
            .then(done)
            .catch(done)
    })

    it('should not post empty article', (done) => {
        store.dispatch(actions.postArticle(''))
        expect(store.getState().type).to.eql(Action.NOOP)
        done()
    })

    const id = 0

    it('should edit articles', (done) => {
        mock(`${url}/articles/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            json: {
                articles
            }
        })

        store.dispatch(actions.editPost(id, 'unused'))
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.ADD_ARTICLES)
                expect(store.getState().articles).to.eql(articles)
            })
            .then(done)
            .catch(done)
    })

    it('should not put empty edit', (done) => {
        store.dispatch(actions.editPost(id, ''))
        expect(store.getState().type).to.eql(Action.NOOP)
        done()
    })

    it('should edit comments', (done) => {
        mock(`${url}/articles/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            json: {
                articles
            }
        })

        store.dispatch(actions.editComment(id, 'unused', 0))
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.ADD_ARTICLES)
                expect(store.getState().articles).to.eql(articles)
            })
            .then(done)
            .catch(done)
    })

    it('should not put empty comment edit', (done) => {
        store.dispatch(actions.editComment(id, '', 0))
        expect(store.getState().type).to.eql(Action.NOOP)
        done()
    })

    it('should fail gracefully on http error', (done) => {
        store.dispatch(actions.postArticle('unused'))
            .then(() => {
                expect(store.getState().type).to.eql(Action.MESSAGE)
                expect(store.getState().messageType).to
                    .eql(MessageTypes.FAILURE)
                return store.dispatch(actions.editPost(0, 'unused'))
            })
            .then(() => {
                expect(store.getState().type).to.eql(Action.MESSAGE)
                expect(store.getState().messageType).to
                    .eql(MessageTypes.FAILURE)
                return store.dispatch(actions.editComment(0, 'unused', -1))
            })
            .then(() => {
                expect(store.getState().type).to.eql(Action.MESSAGE)
                expect(store.getState().messageType).to
                    .eql(MessageTypes.FAILURE)
            })
            .then(done)
            .catch(done)
    })
})