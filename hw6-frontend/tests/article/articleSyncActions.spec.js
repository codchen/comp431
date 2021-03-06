import React from 'react'
import { expect } from 'chai'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import dummy from '../dummyReducer'
import * as actions
    from '../../src/components/article/container/articleActions'
import { Action } from '../../src/actions'

describe('Validate Article synchronous actions', () => {
    const store = createStore(dummy, applyMiddleware(thunkMiddleware))
    it('should update search keyword', (done) => {
        const keyword = 'key'
    	store.dispatch(actions.showAll())
        expect(store.getState().type).to.eql(actions.Action.SET_ARTICLE_FILTER)
        expect(store.getState().filter).to.eql(actions.ArticleFilters.SHOW_ALL)
        expect(store.getState().keyword).to.eql('')
        store.dispatch(actions.searchByText(keyword))
        expect(store.getState().type).to.eql(actions.Action.SET_ARTICLE_FILTER)
        expect(store.getState().filter).to.eql(actions.ArticleFilters.BY_TEXT)
        expect(store.getState().keyword).to.eql(keyword)
        store.dispatch(actions.searchByAuthor(keyword))
        expect(store.getState().type).to.eql(actions.Action.SET_ARTICLE_FILTER)
        expect(store.getState().filter).to
            .eql(actions.ArticleFilters.BY_AUTHOR)
        expect(store.getState().keyword).to.eql(keyword)
        done()
    })

    it('should not update empty search keyword', (done) => {
        store.dispatch(actions.searchByText(''))
        expect(store.getState().type).to.eql(Action.NOOP)
        store.dispatch(actions.searchByAuthor(''))
        expect(store.getState().type).to.eql(Action.NOOP)
        done()
    })

    it('should toggle hiding comments', (done) => {
        const id = 0
        store.dispatch(actions.toggleComments(id))
        expect(store.getState().type).to.eql(actions.Action.TOGGLE_COMMENTS)
        expect(store.getState().postId).to.eql(id)
        done()
    })

    it('should set hiding editing comments', (done) => {
        const postId = 0
        const commentId = 0
        store.dispatch(actions.editingComment(postId, commentId, true))
        expect(store.getState().type).to.eql(actions.Action.EDITING_COMMENT)
        expect(store.getState().postId).to.eql(postId)
        expect(store.getState().commentId).to.eql(commentId)
        expect(store.getState().editing).to.eql(true)
        done()
    })
})