import { expect } from 'chai'
import { createStore } from 'redux'

import profile from '../../src/components/profile/container/profileReducer'
import { Action } from '../../src/components/profile/container/profileActions'


describe('Validate Profile reducer', () => {

	const email = 'a@b'
	const zipcode = '11111'
	const dob = new Date('02/14/1995')
	const store = createStore(profile)
	it('should update email', (done) => {
		store.dispatch({ type: Action.UPDATE_EMAIL, param: email })
		expect(store.getState().email).to.eql(email)
		done()
	})

	it('should update zipcode', (done) => {
		store.dispatch({ type: Action.UPDATE_ZIPCODE, param: zipcode })
		expect(store.getState().zipcode).to.eql(zipcode)
		done()
	})

	it('should set date of birth', (done) => {
		store.dispatch({ type: Action.SET_DOB, param: dob })
		expect(store.getState().dob).to.eql(dob)
		done()
	})
})