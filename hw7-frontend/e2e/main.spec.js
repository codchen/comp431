import { expect } from 'chai'
import { go, sleep, findId, findIdChildren, findClass } from './selenium'
import common from './common'

const countFollowers = () => 
	sleep(500)
		.then(() => findClass('follower'))
		.then((users) => users.length)

describe('Test main page', () => {
	before('should log in and go to main page', (done) => {
        go().then(common.login).then(done).catch(done)
    })

    it('should update the headline and verify the change', (done) => {
    	const newHeadline = 'new headline'
    	sleep(500)
    		.then(findId('headlineTf').clear())
    		.then(findId('headlineTf').sendKeys(newHeadline))
    		.then(findId('headlineSubmit').click())
    		.then(sleep(2000))
    		.then(() => findId('headline'))
    		.then((headline) => headline.getText())
    		.then((text) => {
    			expect(text).to.equal(newHeadline)
    		})
    		.then(done)
    		.catch(done)
    })

    let count

    it('should count the number of followed users', (done) => {
    	const atLeastFollowed = 1
    	sleep(500)
    		.then(countFollowers)
    		.then((cnt) => {
    			expect(cnt).to.be.at.least(atLeastFollowed)
    			count = cnt
    		})
    		.then(done)
    		.catch(done)
    })

    it('should follow user and verify count increases', (done) => {
    	sleep(500)
    		.then(findId('followTf').clear())
    		.then(findId('followTf').sendKeys('Follower'))
    		.then(findId('followSubmit').click())
    		.then(sleep(2000))
    		.then(countFollowers)
    		.then((cnt) => {
    			expect(cnt).to.be.equal(count + 1)
    		})
    		.then(done)
    		.catch(done)
    })

    it('should follow user and verify count decreases', (done) => {
    	sleep(500)
    		.then(() => findClass('follower'))
    		.then((followers) => followers[followers.length - 1])
    		.then((follower) => findIdChildren(follower, 'unfollow').click())
    		.then(sleep(2000))
    		.then(countFollowers)
    		.then((cnt) => {
    			expect(cnt).to.be.equal(count)
    		})
    		.then(done)
    		.catch(done)
    })
})