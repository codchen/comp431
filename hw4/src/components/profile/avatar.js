import React from 'react'
import StylizedFileInput from '../stylizedFileInput'
import { Image } from 'semantic-ui-react'

// The presentational view for avatar
const Avatar = ({ image }) => {
	return (
		<div>
			<Image src={ image } />
			<h4>Update your profile photo here</h4>
			<StylizedFileInput />
		</div>
	)
}

export default Avatar