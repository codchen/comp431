import React from 'react';

// The presentational component for a single followed user
const FollowingCard = ({ avatar, username, headline, onUnfollow }) => (
	<div className='ui fluid card follower'>
		<div className='content'>
			<img className='ui mini right floated image' src={ avatar } />
			<div className='header'>{ username }</div>
			<div className='description'>{ headline }</div>
		</div>
		<div className='extra content'>
			<button className='ui red basic right floated button'
				onClick={
					(e) => {
						e.preventDefault()
						onUnfollow(username) 
					}
				} id='unfollow'>
				Unfollow
			</button>
		</div>
	</div>
)

FollowingCard.propTypes = {
	avatar: React.PropTypes.string,
	username: React.PropTypes.string,
	headline: React.PropTypes.string,
	onUnfollow: React.PropTypes.func.isRequired
}

export default FollowingCard