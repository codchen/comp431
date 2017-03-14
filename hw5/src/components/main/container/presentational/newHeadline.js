import React from 'react'

import StylizedFileInput from '../../../common/stylizedFileInput'

// The presentational component to post a new headline
const NewHeadline = ({ onHeadline, onAvatar }) => {
	let headlineInput
	return (
	<form className='ui form'>
		<div className='field'>
			<label>Update your profile photo here</label>
			<StylizedFileInput fileHandler={ onAvatar }/>
		</div>
		<div className='field'>
			<input type='text' 
				placeholder='Something else for your headline?'
				ref={ (node) => headlineInput = node} />
			<button className='ui teal basic fluid button' onClick={ (e) => {
				e.preventDefault()
				onHeadline(headlineInput.value)
				headlineInput.value = ''
			} }>
				Update Headline
			</button>
		</div>
	</form>
)}

NewHeadline.propTypes = {
	onHeadline: React.PropTypes.func.isRequired,
	onAvatar: React.PropTypes.func.isRequired
}

export default NewHeadline