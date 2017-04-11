import React from 'react'
import { expect } from 'chai'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import dummy from '../dummyReducer'
import { url } from '../../src/utils/ajax'
import fetch, { mock } from 'mock-fetch'
import { Action, MessageTypes } from '../../src/actions'

import * as actions from '../../src/components/main/container/followingActions'

describe('Validate Following list asyncronous actions', () => {
    const username = 'Tony'
    const toFollow = 'Alice'
    const store = createStore(dummy, applyMiddleware(thunkMiddleware))

	beforeEach(() => {
        global.fetch = fetch
    })

    it('should follow a user', (done) => {

        mock(`${url}/following/${toFollow}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            json: {
                username,
                following: [toFollow]
            }
        })

        mock(`${url}/headlines/${toFollow}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: {
                headlines: [{
                    username,
                    headline: ''
                }]
            }
        })

        mock(`${url}/avatars/${toFollow}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: {
                avatars: [{
                    username,
                    avatar: ''
                }]
            }
        })

        store.dispatch(actions.follow(toFollow))
            .then(() => {
                expect(store.getState().type).to.eql(actions.Action.FOLLOWING)
                expect(store.getState().username).to.eql(username)
                expect(store.getState().following).to.eql([toFollow])
            })
            .then(done)
            .catch(done)
    })

    it('should not follow an empty user', (done) => {
        store.dispatch(actions.follow(''))
        expect(store.getState().type).to.eql(Action.NOOP)
        done()
    })

    it('should unfollow a user', (done) => {
        mock(`${url}/following/${toFollow}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            json: {
                username,
                following: []
            }
        })

        store.dispatch(actions.unfollow(toFollow))
            .then(() => {
                expect(store.getState().type).to.eql(actions.Action.FOLLOWING)
                expect(store.getState().username).to.eql(username)
                expect(store.getState().following).to.eql([])
            })
            .then(done)
            .catch(done)
    })

    it('should fetch initial following list', (done) => {
        mock(`${url}/following`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: {
                username,
                following: []
            }
        })

        store.dispatch(actions.setAllFollowing())
            .then(() => {
                expect(store.getState().type).to.eql(actions.Action.FOLLOWING)
                expect(store.getState().username).to.eql(username)
                expect(store.getState().following).to.eql([])
            })
            .then(done)
            .catch(done)
    })

    it('should fail gracefully on http error', (done) => {
        store.dispatch(actions.follow('unused'))
            .then(() => {
                expect(store.getState().type).to.eql(Action.MESSAGE)
                expect(store.getState().messageType).to
                    .eql(MessageTypes.FAILURE)
                return store.dispatch(actions.unfollow('unused'))
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