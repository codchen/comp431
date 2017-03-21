/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

const resource = (method, endpoint, payload) => {
	const options = { method, headers: { 'Content-Type': 'application/json' }}
	if (payload) options.body = JSON.stringify(payload)
	return fetch(url(endpoint), options).then(r => {
			if (r.status == 200) {
				return r.json()
			} else {	
				throw new Error(r.status)
			}
		})
}

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		resource('GET', '/articles')
			.then((r) => r.articles)
			.then((articles) => {
				expect(articles.length).to.be.at.least(3)
			})
			.then(done)
			.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		const article1 = 'hello'
		const article2 = 'hi'
		let firstId
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		resource('POST', '/article', { text: article1 })
			.then((r) => r.articles)
			.then((articles) => {
				expect(articles.length).to.equal(1)
				expect(articles[0]._id).to.be.a('number')
				expect(articles[0].text).to.equal(article1)
				firstId = articles[0]._id
			})
			.then(() => resource('POST', '/article', { text: article2 }))
			.then((r) => r.articles)
			.then((articles) => {
				expect(articles.length).to.equal(1)
				expect(articles[0]._id).to.equal(firstId + 1)
				expect(articles[0].text).to.equal(article2)
			})
			.then(done)
			.catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		let myId
		resource('GET', '/articles')
			.then((r) => r.articles)
			.then((articles) => {
				myId = articles[0]._id
			})
			.then(() => resource('GET', `/articles/${myId}`))
			.then((r) => r.articles)
			.then((articles) => {
				expect(articles.length).to.equal(1)
				expect(articles[0]._id).to.equal(myId)
			})
			.then(done)
			.catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		resource('GET', '/articles/1000')
			.then((r) => r.articles)
			.then((articles) => {
				expect(articles.length).to.equal(0)
			})
			.then(done)
			.catch(done)
	}, 200)

});