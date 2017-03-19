import { expect } from 'chai'
import { createStore } from 'redux'

import home from '../../src/components/main/container/homeReducer'
import { Action } from '../../src/components/main/container/homeActions'


describe('Validate Headline reducer', () => {

	const headline = 'hello world'
	const avatar = 'dummy'
	const store = createStore(home)
	it('should set headline', (done) => {
		store.dispatch({ type: Action.UPDATE_HEADLINE, param: headline })
		expect(store.getState().headline).to.eql(headline)
		done()
	})

	it('should set avatar', (done) => {
		store.dispatch({ type: Action.UPDATE_AVATAR, param: avatar })
		expect(store.getState().avatar).to.eql(avatar)
		done()
	})
})