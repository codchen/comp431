import React from 'react';
import { connect } from 'react-redux'
import ArticlesView from '../article/ArticlesView'
import Following from './following'
import Headline from './headline'
import Navigation from '../nav'
import { followUser, unfollowUser, updateHeadline,
	logout, changeLocation, clearError } from '../../actionCreators'
import { Locations } from '../../actions'
import { Grid } from 'semantic-ui-react'

// Bind state and actions to the following-users presentational component
const SocialAppFollowing = connect(
	(state) => {
		return { followeds: state.follower.followers }
	},
	(dispatch) => {
		return {
			onUnfollow: (toUnfollow) => dispatch(unfollowUser(toUnfollow)),
			onFollow: (toFollow) => dispatch(followUser(toFollow))
		}
	}
)(Following)

// Bind state and actions to the headline presentational component
const SocialAppHeadline = connect(
	(state) => {
		return {
			username: state.profile.username,
			headline: state.profile.headline,
			image: state.profile.image
		}
	},
	(dispatch) => {
		return { onUpdate: (headline) => dispatch(updateHeadline(headline)) }
	}
)(Headline)

// Bind state and actions to the navigation presentational component
const SocialAppMainNavigation = connect(
	(state) => {
		return { username: state.profile.username,
				 location: state.page.location }
	},
	(dispatch) => {
		return {
			onLogout: () => {
				dispatch(logout())
				dispatch(clearError())
                dispatch(changeLocation(Locations.LANDING_PAGE))
			},
			onToProfile: () => {
				dispatch(clearError())
				dispatch(changeLocation(Locations.PROFILE_PAGE))
			}
		}
	}
)(Navigation)

// The main page container component
const Main = () => (
	<div>
		<SocialAppMainNavigation />
		<Grid columns={2}>
			<Grid.Row>
				<Grid.Column width={5} className='left-column'>
					<SocialAppHeadline />
					<SocialAppFollowing />
				</Grid.Column>
				<Grid.Column width={11} className='right-column'>
					<ArticlesView />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	</div>
)

export default Main