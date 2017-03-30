// Handles all authentication-related requests
const md5 = require('md5')
const users = {}
const sessions = {}

const hashcode = (salt, password) => md5(salt + password)

const cookieKey = 'sid'
// Handlers
const login = (req, res) => {
	if (req.body.username === undefined || req.body.password === undefined) {
		return res.status(400).send('Bad request')
	} else if (users[req.body.username] === undefined) {
		return res.status(401).send('Username not registered')
	} else {
		const user = users[req.body.username]
		if (hashcode(user.salt, req.body.password) !== user.hash) {
			return res.status(401).send('Password incorrect')
		} else {
			const sessionId = md5(req.body.username)
			res.cookie(cookieKey, sessionId, {
				maxAge: 3600 * 1000,
				httpOnly: true
			})
			sessions[sessionId] = req.body.username
			return res.send({
				username: req.body.username,
				result: 'success'
			})
		}
	}
}

const register = (req, res) => {
	if (req.body.username === undefined || req.body.password === undefined) {
		return res.status(400).send('Bad request')
	} else if (users[req.body.username] !== undefined) {
		return res.status(401).send('Username existed')
	} else {
		const salt = Math.random().toString(36)
		const hash = hashcode(salt, req.body.password)
		users[req.body.username] = { salt, hash }
		return res.send({
			username: req.body.username,
			result: 'success'
		})
	}
}

module.exports = app => {
     app.post('/login', login)
     app.post('/register', register)
}