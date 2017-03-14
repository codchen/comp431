import React from 'react'

import { HeadlineContainer, NewHeadlineContainer }
	from './container/mainContainer'

// The presentational view for displaying headline and profile images
const HeadlineView = () => (
	<div className='ui fluid card'>
		<div className='content'><HeadlineContainer /></div>
		<div className='extra content'><NewHeadlineContainer /></div>
	</div>
)

export default HeadlineView