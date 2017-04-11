import React from 'react'

import StylizedFileInput from '../../../common/stylizedFileInput'

// The presentational view for avatar
const Avatar = ({ image, onAvatar }) => (
	<div>
		<img className='ui image' src={ image } />
		<h4>Update your profile photo here</h4>
		<StylizedFileInput fileHandler={ onAvatar } />
	</div>
)

Avatar.propTypes = {
	image: React.PropTypes.string.isRequired,
	onAvatar: React.PropTypes.func.isRequired
}

export default Avatar