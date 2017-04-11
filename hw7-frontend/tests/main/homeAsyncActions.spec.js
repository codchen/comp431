import React from 'react'
import { expect } from 'chai'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import dummy from '../dummyReducer'
import { url } from '../../src/utils/ajax'
import fetch, { mock } from 'mock-fetch'
import { Action, MessageTypes } from '../../src/actions'

import * as actions from '../../src/components/main/container/homeActions'

describe('Validate Headline asyncronous actions', () => {
    const username = 'xc12'
    const avatar = 'dummy'
    const headline = 'original headline'
    const store = createStore(dummy, applyMiddleware(thunkMiddleware))

	beforeEach(() => {
        global.fetch = fetch
    })

    it('should update headline', (done) => {
        mock(`${url}/headline`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            json: {
                username,
                headline
            }
        })

        store.dispatch(actions.updateHeadline('unused'))
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.UPDATE_HEADLINE)
                expect(store.getState().param).to.eql(headline)
            })
            .then(done)
            .catch(done)
    })

    it('should not update an empty headline', (done) => {
        store.dispatch(actions.updateHeadline(''))
        expect(store.getState().type).to.eql(Action.NOOP)
        done()
    })

    it('should update avatar', (done) => {
        mock(`${url}/avatar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            json: {
                username,
                avatar
            }
        })

        store.dispatch(actions.updateAvatar(new File([], 'unused')))
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.UPDATE_AVATAR)
                expect(store.getState().param).to.eql(avatar)
            })
            .then(done)
            .catch(done)
    })

    it('should get headline', (done) => {
        mock(`${url}/headlines`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: {
                headlines: [{
                        username,
                        headline
                }]
            }
        })

        store.dispatch(actions.getHeadline())
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.UPDATE_HEADLINE)
                expect(store.getState().param).to.eql(headline)
            })
            .then(done)
            .catch(done)
    })

    it('should get avatar', (done) => {
        mock(`${url}/avatars`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: {
                avatars: [{
                        username,
                        avatar
                }]
            }
        })

        store.dispatch(actions.getAvatar())
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.UPDATE_AVATAR)
                expect(store.getState().param).to.eql(avatar)
            })
            .then(done)
            .catch(done)
    })

    it('should fail gracefully on http error', (done) => {
        store.dispatch(actions.updateHeadline('unused'))
            .then(() => {
                expect(store.getState().type).to.eql(Action.MESSAGE)
                expect(store.getState().messageType).to
                    .eql(MessageTypes.FAILURE)
                return store.dispatch(actions.updateAvatar('unused'))
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