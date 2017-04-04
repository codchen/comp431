module.exports = function(req, res, next) {
	res.set({
		'Access-Control-Allow-Origin':'http://127.0.0.1:8080',
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
		'Access-Control-Allow-Headers': 'Authorization, Content-Type'
	})
	if (req.method === 'OPTIONS') {
		return res.status(200).send('OK')
	}
	return next()
}