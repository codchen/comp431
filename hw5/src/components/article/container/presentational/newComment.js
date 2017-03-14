import React from 'react'
import { Modal } from 'semantic-ui-react'

// A modal that let user make a new comment.
const NewComment = ({ onComment }) => {
	let commentInput
	return (
	<Modal className='article-modal'
			trigger={ <button className='ui button'>Comment</button> }>
		<div className='header'>Make a comment</div>
	    <div className='content'>
	      	<div className='description'>
	      		<form className='ui form'>
	        		<textarea ref={ (node) => commentInput = node} />
	        	</form>
	      	</div>
	    </div>
	    <button className='ui button' onClick={(e) => {
	    	e.preventDefault()
    		onComment(commentInput.value)
    	} }>Submit</button>
	</Modal>
)}

NewComment.propTypes = {
	onComment: React.PropTypes.func.isRequired
}

export default NewComment