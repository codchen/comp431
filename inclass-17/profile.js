const loggedInUser = 'Tony'

const profiles = [
	{
		username: 'me',
		headline: 'hi',
		email: 'a@b',
		zipcode: 12345,
		avatar: 'a1'
	},
	{
		username: 'him',
		headline: 'hello',
		email: 'c@d',
		zipcode: 11111,
		avatar: 'a2'
	},{
		username: 'Tony',
		headline: 'old',
		email: 'e@f',
		zipcode: 77005,
		avatar: 'a3'
	}
]

const extract = (type) => (p) => {
	let info = { username: p.username }
	info[type] = p[type]
	return info
}

const getCollection = (type) => (req, res) => {
	const key = type + 's'
	let payload = {}
	payload[key] = profiles.map(extract(type))
	if (req.params.user) {
		const users = req.params.user.split(',')
		payload[key] = payload[key].filter((p) => users.includes(p.username))
	}
	res.send(payload)
}

const getItem = (type) => (req, res) => {
	const user = req.params.user ? req.params.user : loggedInUser
	const p = profiles.find((p) => p.username === user)
	res.send(extract(type)(p))
}

const putItem = (type) => (req, res) => {
	const input = req.body[type]
	const p = profiles.find((p) => p.username === loggedInUser)
	p[type] = input
	res.send(extract(type)(p))
}

const index = (req, res) => {
     res.send({ hello: 'world' })
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getCollection('headline'))
     app.put('/headline', putItem('headline'))
     app.get('/avatars/:user?', getCollection('avatar'))
     app.put('/avatar', putItem('avatar'))
     app.get('/zipcode/:user?', getItem('zipcode'))
     app.put('/zipcode', putItem('zipcode'))
     app.get('/email/:user?', getItem('email'))
     app.put('/email', putItem('email'))
}
