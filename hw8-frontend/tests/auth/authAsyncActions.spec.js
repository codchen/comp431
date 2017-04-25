import React from 'react'
import { expect } from 'chai'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import dummy from '../dummyReducer'
import { url } from '../../src/utils/ajax'
import fetch, { mock } from 'mock-fetch'
import { Action, MessageTypes } from '../../src/actions'

import * as actions from '../../src/components/auth/container/authActions'

describe('Validate Authentication asyncronous actions', () => {
    const username = 'Tony'
    const password = '123456'
    const toRegister = {
        username,
        password,
        email: 'a@b',
        dob: '02/14/1995',
        zipcode: '77005'
    }

    const store = createStore(dummy, applyMiddleware(thunkMiddleware))

	beforeEach(() => {
        global.fetch = fetch
    })

    it('should log in a user', (done) => {
        mock(`${url}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            json: {
                username,
                result: 'success'
            }
        })

        store.dispatch(actions.login(username, password))
            .then(() => {
                expect(store.getState().type).to.eql(actions.Action.LOGIN)
                expect(store.getState().username).to.eql(username)
            })
            .then(done)
            .catch(done)
    })

    it('should not log in an invalid user', (done) => {
        mock(`${url}/login`, {
            method: 'POST',
            status: 401,
            text: 'Unauthorized'
        })

        store.dispatch(actions.login(username, password))
            .then(() => {
                expect(store.getState().type).to.eql(Action.MESSAGE)
                expect(store.getState().messageType).to
                    .eql(MessageTypes.FAILURE)
            })
            .then(done)
            .catch(done)
    })

    it('should log out a user', (done) => {
        mock(`${url}/logout`, {
            method: 'PUT',
            headers: { 'Content-Type': 'text/plain' },
            text: 'OK'
        })

        store.dispatch(actions.logout())
            .then(() => {
               expect(store.getState().type).to.eql(actions.Action.LOGOUT)
            })
            .then(done)
            .catch(done)
    })

    it('should register a user', (done) => {
        mock(`${url}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            json: {
                result: 'success',
                username
            }
        })

        store.dispatch(actions.register(toRegister)).then(() => {
                expect(store.getState().type).to.eql(actions.Action.REG)
                expect(store.getState().username).to.eql(username)
            })
            .then(done)
            .catch(done)
    })

    it('should not register an invalid user', (done) => {
        store.dispatch(actions.register({}))
        expect(store.getState().type).to.eql(Action.MESSAGE)
        expect(store.getState().messageType).to.eql(MessageTypes.FAILURE)
        done()
    })

    it('should fail gracefully on http error', (done) => {
        store.dispatch(actions.register(toRegister))
            .then(() => {
                expect(store.getState().type).to.eql(Action.MESSAGE)
                expect(store.getState().messageType).to
                    .eql(MessageTypes.FAILURE)
                return store.dispatch(actions.logout())
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