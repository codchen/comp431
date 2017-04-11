import { expect } from 'chai'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { url, resource } from '../src/utils/ajax'
import dummy from './dummyReducer'
import * as actions from '../src/actions'
import fetch, { mock } from 'mock-fetch'

describe('Validate actions', () => {
	beforeEach(() => {
        global.fetch = fetch
    })

    it('resource should be a resource', (done) => {
    	const text = 'Got the resource'
    	const endpoint = 'test-resource'
    	mock(`${url}/${endpoint}`, {
    		method: 'GET',
    		headers: { 'Content-Type': 'text/plain' },
    		text
    	})
    	resource('GET', endpoint, '')
    		.then((r) => {
    			expect(r).to.eql(text)
    		})
    		.then(done)
    		.catch(done)
    })

    it('resource should give me the http error', (done) => {
    	const statusText = 'Forbidden'
    	const endpoint = 'test-error'
    	mock(`${url}/${endpoint}`, {
    		method: 'GET',
    		status: 403,
    		statusText,
    		headers: { 'Content-Type': 'text/plain' },
    		text: 'not relevant'
    	})
    	resource('GET', endpoint, '')
    		.catch((reason) => {
    			expect(reason.message).to.contain(statusText)
    		})
    		.then(done)
    		.catch(done)
    })

    it('resource should be POSTable', (done) => {
    	const text = 'POSTed'
    	const payload = {
    		dummy: 'dummy'
    	}
    	const endpoint = 'test-post'
    	mock(`${url}/${endpoint}`, {
    		method: 'POST',
    		headers: { 'Content-Type': 'text/plain' },
    		text
    	})
    	resource('POST', endpoint, payload)
    		.then((r) => {
    			expect(r).to.eql(text)
    		})
    		.then(done)
    		.catch(done)
    })

    const store = createStore(dummy, applyMiddleware(thunkMiddleware))

    it('should update error message', (done) => {
        const errMsg = 'error message'
        store.dispatch(actions.updateErrorMessage(errMsg))
        expect(store.getState().type).to.eql(actions.Action.MESSAGE)
        expect(store.getState().messageType).to
            .eql(actions.MessageTypes.FAILURE)
        expect(store.getState().text).to.eql(errMsg)
        done()
    })

    it('should update success message', (done) => {
        const succMsg = 'success message'
        store.dispatch(actions.updateSuccessMessage(succMsg))
        expect(store.getState().type).to.eql(actions.Action.MESSAGE)
        expect(store.getState().messageType).to
            .eql(actions.MessageTypes.SUCCESS)
        expect(store.getState().text).to.eql(succMsg)
        done()
    })

    it('should navigate to profile', (done) => {
        store.dispatch(actions.toProfile())
        expect(store.getState().type).to.eql(actions.Action.LOCATION_CHANGE)
        expect(store.getState().location).to
            .eql(actions.Locations.PROFILE_PAGE)
        done()
    })

    it('should navigate to main', (done) => {
        store.dispatch(actions.toMain())
        expect(store.getState().type).to.eql(actions.Action.LOCATION_CHANGE)
        expect(store.getState().location).to.eql(actions.Locations.MAIN_PAGE)
        done()
    })

    it('should navigate to landing', (done) => {
        store.dispatch(actions.toLanding())
        expect(store.getState().type).to.eql(actions.Action.LOCATION_CHANGE)
        expect(store.getState().location).to
            .eql(actions.Locations.LANDING_PAGE)
        done()
    })

    it('should clear message', (done) => {
        store.dispatch(actions.clearMessage(0))
        setTimeout(() => {
            expect(store.getState().type).to.eql(actions.Action.MESSAGE)
            expect(store.getState().messageType).to
                .eql(actions.MessageTypes.SUCCESS)
            expect(store.getState().text).to.eql('')
            done()
        }, 10)
    })

    it('should perform no operation', (done) => {
        store.dispatch(actions.noop())
        expect(store.getState().type).to.eql(actions.Action.NOOP)
        done()
    })
})