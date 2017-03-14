import React from 'react'

// The presentational container to show user's headline and avatar
const Headline = ({ username, headline, image }) => (
	<div className='ui two column grid'>
		<div className='row'>
			<div className='three wide column'>
				<img className='ui small centered image' src={ image } />
			</div>
			<div className='thirteen wide column'>
				<div className='ui header' as='h1'>{ username }</div>
				<div className='description'>{ headline }</div>
			</div>
		</div>
	</div>
)

Headline.propTypes = {
	username: React.PropTypes.string.isRequired,
	headline: React.PropTypes.string.isRequired,
	image: React.PropTypes.string.isRequired
}

export default Headline