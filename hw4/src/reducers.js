import { combineReducers } from 'redux'
import * as Actions from './actions'
import * as Assets from './assets'

// This file containers all Redux reducers used by this app

// Utility function to generate a random headline of length 20
const randomHeadline = () => {
	let headline = ''
	const dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcd' + 
		'efghijklmnopqrstuvwxyz0123456789'
	Array.apply(null, Array(20)).forEach(() => {
		headline += dict.charAt(Math.floor(Math.random() * dict.length))
	})
	return headline
}

const initialArticles = require('./data/articles.json')

const initialArticlesFormatted = Object.assign({}, initialArticles, {
	articles: initialArticles.articles.map(
		(article) => Object.assign({}, article, { 
			date: new Date(article.date),
			image: Assets.samples[article.image] })
	)
})

const initialFollowers = require('./data/followers.json')

const initialFollowersFormatted = Object.assign({}, initialFollowers, {
	followers: initialFollowers.followers.map(
		(follower) => Object.assign({}, follower, {
			image: Assets.dummies[follower.image]
		})
	)
})

const initialProfile = require('./data/profile.json')

const initialProfileFormatted = Object.assign({}, initialProfile, {
	image: Assets.dummies[initialProfile.image]
})

const initialErrors = require('./data/errors.json')

const initialPage = require('./data/page.json')

// The global action reducer
const page = (state = initialPage, action) => {
	switch (action.type) {
		case Actions.LOCATION_CHANGE:
			return Object.assign({}, state, { 
				location: action.newLocation
			})
		case Actions.LANDING_TOGGLE:
			return Object.assign({}, state, {
				onRegister: !state.onRegister
			})
		default:
			return state
	}
}

// The user-related action reducer
const profile = (state = initialProfileFormatted, action) => {
	switch (action.type) {
		case Actions.LOG_IN:
			return Object.assign({}, state, {
				username: action.username,
				password: action.password
			})
		case Actions.LOG_OUT:
			return Object.assign({}, state, {
				username: ''
			})
		case Actions.REGISTER:
			return Object.assign({}, state, action.userInfo)
		case Actions.UPDATE_HEADLINE:
			return Object.assign({}, state, {
				headline: action.newHeadline
			})
		case Actions.UPDATE_INFO:
			return Object.assign({}, state, action.userInfo)
		case Actions.UPDATE_IMAGE:
			return Object.assign({}, state, {
				image: action.image
			})
		default:
			return state
	}
}

// The article-related action reducer
const article = (state = initialArticlesFormatted, action) => {
	switch (action.type) {
		case Actions.SET_ARTICLE_FILTER:
			return Object.assign({}, state, {
				filter: action.filter,
				keyword: action.keyword })
		case Actions.POST_ARTICLE:
			return Object.assign({}, state, {
				articles: [...state.articles, {
					articleID: action.articleID,
					author: action.author,
					text: action.text,
					date: new Date(),
					image: ''
				}]
			})
		default:
			return state
	}
}

// The following-related action reducer
const follower = (state = initialFollowersFormatted, action) => {
	switch (action.type) {
		case Actions.FOLLOW_USER:
			return Object.assign({}, state, {
				followers: [...state.followers, {
					username: action.toFollow,
					headline: randomHeadline(),
					image: Assets.dummies.dummy2
				}]
			})
		case Actions.UNFOLLOW_USER:
			return Object.assign({}, state, {
				followers: state.followers.filter((followed) =>
					followed.username != action.toUnfollow)
			})
		default:
			return state
	}
}

// The error reducer
const error = (state = initialErrors, action) => {
	switch (action.type) {
		case Actions.CLEAR_ERROR:
			return Object.assign({}, state, {
				loginError: '',
				registerError: '',
				updateError: ''
			})
		case Actions.ERROR:
			switch (action.code) {
				case Actions.Errors.LOG_IN_USERNAME:
					return Object.assign({}, state, {
						loginError: '0_Invalid username'
					})
				case Actions.Errors.LOG_IN_PASSWORD:
					return Object.assign({}, state, {
						loginError: '1_Invalid password'
					})
				case Actions.Errors.REGISTER_USERNAME:
					return Object.assign({}, state, {
						registerError: '0_Invalid username ' + 
							'(Requires start with a letter and ' + 
							'only contains letters and digits)'
					})
				case Actions.Errors.REGISTER_PASSWORD:
					return Object.assign({}, state, {
						registerError: '1_Invalid password'
					})
				case Actions.Errors.REGISTER_EMAIL:
					return Object.assign({}, state, {
						registerError: '2_Invalid email'
					})
				case Actions.Errors.REGISTER_PHONE:
					return Object.assign({}, state, {
						registerError: '3_Invalid phone number' + 
							'(Requires 10 digits)'
					})
				case Actions.Errors.REGISTER_BIRTHDAY:
					return Object.assign({}, state, {
						registerError: '4_Invalid birthday' + 
							'(Requires "MM/DD/YYYY")'
					})
				case Actions.Errors.REGISTER_ZIP:
					return Object.assign({}, state, {
						registerError: '5_Invalid zipcode (Requires 5 digits)'
					})
				case Actions.Errors.UPDATE_USERNAME:
					return Object.assign({}, state, {
						updateError: '0_Invalid username (Requires start ' + 
							'with a letter and only contains letters and ' +
							'digits)'
					})
				case Actions.Errors.UPDATE_PASSWORD:
					return Object.assign({}, state, {
						updateError: '1_Invalid password'
					})
				case Actions.Errors.UPDATE_EMAIL:
					return Object.assign({}, state, {
						updateError: '2_Invalid email'
					})
				case Actions.Errors.UPDATE_PHONE:
					return Object.assign({}, state, {
						updateError: '3_Invalid phone number ' + 
							'(Requires 10 digits)'
					})
				case Actions.Errors.UPDATE_ZIP:
					return Object.assign({}, state, {
						updateError: '4_Invalid zipcode (Requires 5 digits)'
					})
				default:
					return state
			}
		default:
			return state
	}
}

// The combined reducer to be registered
const reducer = combineReducers({
	page,
	profile,
	article,
	follower,
	error
})


export default reducer