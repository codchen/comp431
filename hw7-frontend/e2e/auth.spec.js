import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'


describe('Test Authentication', () => {
    it('should register a new user', (done) => {
        go()
            .then(findId('register').click())
            .then(findId('username').clear())
            .then(findId('password').clear())
            .then(findId('email').clear())
            .then(findId('dob').clear())
            .then(findId('zipcode').clear())
            .then(findId('username').sendKeys('newuser'))
            .then(findId('password').sendKeys('123456'))
            .then(findId('email').sendKeys('a@b'))
            .then(findId('dob').sendKeys('02/14/1995'))
            .then(findId('zipcode').sendKeys('12345'))
            .then(findId('submit').click())
            .then(sleep(2000))
            .then(done)
            .catch(done)
    })

    it('should log in a new user', (done) => {
        go()
            .then(common.login)
            .then(done)
            .catch(done)
    })

    it('should log out', (done) => {
        sleep(500)
            .then(common.logout)
            .then(done)
            .catch(done)
    })
})
