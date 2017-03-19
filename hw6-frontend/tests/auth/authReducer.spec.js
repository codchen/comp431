import { expect } from 'chai'
import { createStore } from 'redux'

import auth from '../../src/components/auth/container/authReducer'
import { Action } from '../../src/components/auth/container/authActions'


describe('Validate Authentication reducer', () => {

	const username = 'Tony'
	const store = createStore(auth)
	it('should do nothing on register', (done) => {
		store.dispatch({ type: Action.REG })
		expect(store.getState().username).to.eql('')
		done()
	})

	it('should set register requested', (done) => {
		store.dispatch({ type: Action.REG_LOADING, loading: true })
		expect(store.getState().regLoading).to.be.true
		done()
	})

	it('should set logged user', (done) => {
		store.dispatch({ type: Action.LOGIN, username })
		expect(store.getState().username).to.eql(username)
		done()
	})

	it('should set login requested', (done) => {
		store.dispatch({ type: Action.LOGIN_LOADING, loading: true })
		expect(store.getState().loginLoading).to.be.true
		done()
	})

	it('should set user log out', (done) => {
		store.dispatch({ type: Action.LOGOUT })
		expect(store.getState().username).to.eql('')
		done()
	})
})