const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     switch (req.url) {
          case '/':
               if (req.method === 'GET') {
                    rootGetHandler(res)
               }
               return
          case '/articles':
               if (req.method === 'GET') {
                    articleGetHandler(res)
               }
               return
          case '/login':
               if (req.method === 'POST') {
                    loginPostHandler(res, req.body)
               }
               return
          case '/logout':
               if (req.method === 'PUT') {
                    logoutPutHandler(res)
               }
               return
     }
}

function rootGetHandler(res) {
     const payload = { 'hello': 'world' }
     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}

function articleGetHandler(res) {
     const payload = {
          'articles': [
               {
                    id: 1,
                    author: 'Scott', 
                    body: 'A post'
               }, {
                    id: 2,
                    author: 'Tony',
                    body: 'Another post'
               }, {
                    id: 3,
                    author: 'Mike',
                    body: 'Yet another post'
               }
          ]
     }
     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}

function loginPostHandler(res, body) {
     const creds = JSON.parse(body)
     if (!validateCreds(creds)) {
          res.statusCode = 400
          res.end()
          return
     }
     const payload = {
          'username': creds.username,
          'result': 'success'
     }
     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}

function logoutPutHandler(res) {
     res.statusCode = 200
     res.end('OK\n')
}

function validateCreds(creds) {
     return creds.username && creds.password
}