// Handles all authentication-related requests

// Constants
const username = 'Tony'

// Handlers
const login = (req, res) => {
	return res.send({
		username,
		result: 'success'
	})
}

const register = (req, res) => {
	if (req.body.username === undefined) {
		return res.status(400).send('Bad request')
	} else {
		return res.send({
			username,
			result: 'success'
		})
	}
}

const logout = (req, res) => {
	return res.send('OK')
}

const password = (req, res) => {
	return res.send({
		username,
		status: 'will not change'
	})
}

const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const config = require('./config.json')
const googleUsers = {}
passport.serializeUser((user, done) => {
	googleUsers[user.id] = user
  	done(null, user.id)
});

passport.deserializeUser((id, done) => {
  	done(null, googleUsers[id])
});
passport.use(new GoogleStrategy(
	config.google,
    (accessToken, refreshToken, profile, done) => {
    	return done(null, profile)
  	}
));

module.exports = app => {
	app.use(session({ secret: 'aloha' }))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use('/auth/google', passport.authenticate('google', { scope: ['email'] }))
	app.use('/google/callback', passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	}))
	app.use(cookieParser())
    app.post('/login', login)
    app.post('/register', register)
    app.put('/logout', logout)
    app.put('/password', password)
}