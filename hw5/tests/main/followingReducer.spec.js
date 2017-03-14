import { expect } from 'chai'
import { createStore } from 'redux'

import following from '../../src/components/main/container/followingReducer'
import { Action } from '../../src/components/main/container/followingActions'


describe('Validate Following list reducer', () => {

	const username = 'Tony'
	const idList = ['Alice', 'Seb']
	const idOnly = [{ id: 'Alice' }, { id: 'Seb' }]
	const withHeadline = [{
		username: 'Alice',
		headline: 'hello'
	}, {
		username: 'Seb',
		headline: 'hi'
	}]
	const withAvatar = [{
		username: 'Alice',
		avatar: 'dummy1'
	}, {
		username: 'Seb',
		avatar: 'dummy2'
	}]
	const followingInfo = [{
		id: 'Alice',
		username: 'Alice',
		headline: 'hello',
		avatar: 'dummy1'
	}, {
		id: 'Seb',
		username: 'Seb',
		headline: 'hi',
		avatar: 'dummy2'
	}]
	const store = createStore(following)
	it('should set followed users', (done) => {
		store.dispatch({ type: Action.FOLLOWING, username, following: idList })
		expect(store.getState().username).to.eql(username)
		expect(store.getState().following).to.eql(idOnly)
		done()
	})

	it('should set followed users\' information', (done) => {
		store.dispatch({ type: Action.UPDATE_HEADLINES, params: withHeadline })
		store.dispatch({ type: Action.UPDATE_AVATARS, params: withAvatar })
		expect(store.getState().following).to.eql(followingInfo)
		done()
	})
})