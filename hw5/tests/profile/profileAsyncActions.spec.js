import React from 'react'
import { expect } from 'chai'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import dummy from '../dummyReducer'
import { url } from '../../src/utils/ajax'
import fetch, { mock } from 'mock-fetch'
import { Action, MessageTypes } from '../../src/actions'

import * as actions
    from '../../src/components/profile/container/profileActions'

describe('Validate Profile asyncronous actions', () => {
    const username = 'xc12'
    const email = 'xc12@rice.edu'
    const zipcode = '77005'
    const dob = (new Date('02/14/1995')).getTime()
    const store = createStore(dummy, applyMiddleware(thunkMiddleware))

	beforeEach(() => {
        global.fetch = fetch
    })

    it('should fetch the user\'s profile information', (done) => {
        mock(`${url}/email`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: {
                username,
                email
            }
        })
        mock(`${url}/zipcode`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: {
                username,
                zipcode
            }
        })
        mock(`${url}/dob`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: {
                username,
                dob
            }
        })

        store.dispatch(actions.getEmail())
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.UPDATE_EMAIL)
                expect(store.getState().param).to.eql(email)
                return store.dispatch(actions.getZipcode())
            })
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.UPDATE_ZIPCODE)
                expect(store.getState().param).to.eql(zipcode)
                return store.dispatch(actions.getDob())
            })
            .then(() => {
                expect(store.getState().type).to.eql(actions.Action.SET_DOB)
                expect(store.getState().param).to.eql(dob)
            })
            .then(done)
            .catch(done)
    })

    it('should update user\'s profile information', (done) => {
        mock(`${url}/email`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            json: {
                username,
                email
            }
        })
        mock(`${url}/zipcode`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            json: {
                username,
                zipcode
            }
        })
        mock(`${url}/password`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            json: {
                username,
                status: 'will not change'
            }
        })

        store.dispatch(actions.updateEmail('unused@rice.edu'))
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.UPDATE_EMAIL)
                expect(store.getState().param).to.eql(email)
                return store.dispatch(actions.updateZipcode('12345'))
            })
            .then(() => {
                expect(store.getState().type).to
                    .eql(actions.Action.UPDATE_ZIPCODE)
                expect(store.getState().param).to.eql(zipcode)
                return store.dispatch(actions.updatePassword('unused'))
            })
            .then(() => {
                expect(store.getState().type).to.eql(Action.NOOP)
            })
            .then(done)
            .catch(done)
    })

    it('should not update invalid profile information', (done) => {
        store.dispatch(actions.updateEmail('invalid'))
        expect(store.getState().type).to.eql(Action.MESSAGE)
        expect(store.getState().messageType).to.eql(MessageTypes.FAILURE)
        store.dispatch(actions.updateZipcode('invalid'))
        expect(store.getState().type).to.eql(Action.MESSAGE)
        expect(store.getState().messageType).to.eql(MessageTypes.FAILURE)
        store.dispatch(actions.updatePassword(''))
        expect(store.getState().type).to.eql(Action.MESSAGE)
        expect(store.getState().messageType).to.eql(MessageTypes.FAILURE)
        done()
    })

    it('should fail gracefully on http error', (done) => {
        store.dispatch(actions.updateEmail('a@b'))
            .then(() => {
                expect(store.getState().type).to.eql(Action.MESSAGE)
                expect(store.getState().messageType).to
                    .eql(MessageTypes.FAILURE)
                return store.dispatch(actions.updateZipcode('11111'))
            })
            .then(() => {
                expect(store.getState().type).to.eql(Action.MESSAGE)
                expect(store.getState().messageType).to
                    .eql(MessageTypes.FAILURE)
                return store.dispatch(actions.updatePassword('unused'))
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