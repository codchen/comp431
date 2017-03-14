import React from 'react'
import { Modal } from 'semantic-ui-react'

// A modal that let user edit an article.
const EditArticle = ({ text, id, onEditArticle }) => {
	let editInput
	return (<Modal className='article-modal'
			trigger={ <button className='ui button'>Edit</button> }>
		<div className='header'>Edit the article</div>
	    <div className='content'>
	      	<div className='description'>
	      		<form className='ui form'>
		        	<textarea ref={ (node) => editInput = node}
		        		defaultValue={ text } />
	        	</form>
	      	</div>
	    </div>
	    <button className='ui button' onClick={(e) => {
	    	e.preventDefault()
    		onEditArticle(id, editInput.value)
    	} }>Submit</button>
	</Modal>)
}

EditArticle.propTypes = {
	text: React.PropTypes.string.isRequired,
	id: React.PropTypes.number.isRequired,
	onEditArticle: React.PropTypes.func.isRequired
}

export default EditArticle