import React from 'react'

// The presentational component to add a new followed user
const NewFollowing = ({ onFollow }) => {
	let usernameInput
	return (
		<form className='ui form'>
			<div className='field'>
				<input type='text' placeholder='New Friend ...'
					ref={ (node) => usernameInput = node} />
			</div>
			<div className='field'>
				<button className='ui teal basic fluid button' onClick={ (e) => {
					e.preventDefault()
					onFollow(usernameInput.value)
					usernameInput.value = ''
				} }>Follow!</button>
			</div>
		</form>
	)
}

NewFollowing.propTypes = {
	onFollow: React.PropTypes.func.isRequired
}

export default NewFollowing