import React from 'react'
import { connect } from 'react-redux'

import Headline from './presentational/headline'
import NewFollowing from './presentational/newFollowing'
import NewHeadline from './presentational/newHeadline'
import FollowingCard from './presentational/followingCard'

import Navigation from '../../common/nav'

import { follow, unfollow } from './followingActions'
import { updateHeadline, updateAvatar } from './homeActions'
import { logout } from '../../auth/container/authActions'
import { toProfile } from '../../../actions'

// Container of add followed user component
export const NewFollowingContainer = connect(null,
	(dispatch) => ({ onFollow: (user) => dispatch(follow(user)) })
)(NewFollowing)

// Container of post headline component
export const NewHeadlineContainer = connect(null,
	(dispatch) => ({
		onHeadline: (headline) => dispatch(updateHeadline(headline)),
		onAvatar: (avatar) => dispatch(updateAvatar(avatar))
}))(NewHeadline)

// Container of main page navigation component
export const MainNavigation = connect(null, (dispatch) => ({
	btn1: () => (<button className='ui blue basic button btnNav'
				onClick={ () => dispatch(logout()) }>
				{ 'Log out' }
			</button>),
	btn2: () => (<button className='ui blue basic button btnNav'
				onClick={ () => dispatch(toProfile()) }>
				{ 'Profile' }
		 	</button>)
}))(Navigation)

// Container of headline component
export const HeadlineContainer = connect((state) => ({
	username: state.auth.username,
	headline: state.home.headline,
	image: state.home.avatar
}))(Headline)

// Container of followed user list component
export const FollowingUsersContainer = connect(
	(state) => ({ following: state.following.following }),
	(dispatch) => ({ onUnfollow: (user) => dispatch(unfollow(user)) })
)(({ following, onUnfollow }) => (
	<div className='ui cards'>
		{following.map((following, index) => (
			<FollowingCard key={ index }
				avatar={ following.avatar }
				username = { following.username }
				headline = { following.headline }
				onUnfollow={ onUnfollow } />))}
	</div>
))