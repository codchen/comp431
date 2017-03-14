import { expect } from 'chai'
import { createStore } from 'redux'

import reducer from '../src/reducers'
import * as actions from '../src/actions'

describe('Validate reducer', () => {
    const store = createStore(reducer)

    it('should initialize state', (done) => {
        expect(store.getState()).to.be.ok
        done()
    })

    it('should state success', (done) => {
        const succMsg = 'success'
        store.dispatch({ type: actions.Action.MESSAGE,
            messageType: actions.MessageTypes.SUCCESS, text: succMsg })
        expect(store.getState().page.messageType).to
            .eql(actions.MessageTypes.SUCCESS)
        expect(store.getState().page.messageText).to.eql(succMsg)
        done()
    })

    it('should state error', (done) => {
        const errMsg = 'error'
        store.dispatch({ type: actions.Action.MESSAGE,
            messageType: actions.MessageTypes.FAILURE, text: errMsg })
        expect(store.getState().page.messageType).to
            .eql(actions.MessageTypes.FAILURE)
        expect(store.getState().page.messageText).to.eql(errMsg)
        done()
    })

    it('should set location', (done) => {
        store.dispatch({ type: actions.Action.LOCATION_CHANGE,
            location: actions.Locations.MAIN_PAGE })
        expect(store.getState().page.location).to
            .eql(actions.Locations.MAIN_PAGE)
        done()
    })
})