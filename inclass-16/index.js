const express = require('express')
const bodyParser = require('body-parser')

let articles = [
	{
		id: 1,
		author: 'Scott',
		text: 'This is Scott\'s article'
	}, {
		id: 2,
		author: 'Tony',
		text: 'This is Tony\'s article'
	}, {
		id: 3,
		author: 'Alice',
		text: 'This is Alice\'s article'
	}
]

let nextId = 4

const addArticle = (req, res, next) => {
	console.log('Payload received', req.body)
	articles = [...articles, {
		id: nextId,
		text: req.body.text
	}]
	nextId = nextId + 1
	next()
}

const getArticle = (req, res) => {
	res.send({
     	'articles': articles
    })
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.post('/article', getArticle)
app.get('/articles', getArticle)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})