import { expect } from 'chai'
import { go, sleep, findId } from './selenium'
import common from './common'

describe('Test profile page', () => {
	before('should log in and go to profile page', (done) => {
        go().then(common.login).then(common.toProfile).then(done).catch(done)
    })

	it('should update email and verify', (done) => {
		const newEmail = 'a@b'
		sleep(500)
			.then(findId('emailTf').clear())
			.then(findId('emailTf').sendKeys(newEmail))
			.then(findId('emailSubmit').click())
			.then(sleep(2000))
			.then(() => findId('email').getText())
			.then((text) => {
				expect(text).to.equal(newEmail)
			})
			.then(done)
			.catch(done)
	})

	it('should update zipcode and verify', (done) => {
		const newZipcode = '11111'
		sleep(500)
			.then(findId('zipcodeTf').clear())
			.then(findId('zipcodeTf').sendKeys(newZipcode))
			.then(findId('zipcodeSubmit').click())
			.then(sleep(2000))
			.then(() => findId('zipcode').getText())
			.then((text) => {
				expect(text).to.equal(newZipcode)
			})
			.then(done)
			.catch(done)
	})

	it('should update email and verify not change message', (done) => {
		const newPassword = '1'
		sleep(500)
			.then(findId('passwordTf').clear())
			.then(findId('passwordTf').sendKeys(newPassword))
			.then(findId('passwordSubmit').click())
			.then(sleep(2000))
			.then(() => findId('password').getText())
			.then((text) => {
				expect(text).to.have.string('will not change')
			})
			.then(done)
			.catch(done)
	})
})