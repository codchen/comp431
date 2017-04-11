import React from 'react'
import { Modal } from 'semantic-ui-react'

// A modal that let user edit an article.
const EditArticle = ({ text, id, onEditArticle }) => {
	let editInput
	return (<Modal className='article-modal'
			trigger={ <button className='ui button'
				id='editArticle'>Edit</button> }
			closeOnTriggerClick>
		<div className='header'>Edit the article</div>
	    <div className='content'>
	      	<div className='description'>
	      		<form className='ui form'>
		        	<textarea ref={ (node) => editInput = node}
		        		defaultValue={ text }
		        		id='editArticleTf'/>
	        	</form>
	      	</div>
	    </div>
	    <button className='ui button' onClick={(e) => {
	    	e.preventDefault()
    		onEditArticle(id, editInput.value)
    	} } id='editArticleSubmit'>Submit</button>
	</Modal>)
}

EditArticle.propTypes = {
	text: React.PropTypes.string.isRequired,
	id: React.PropTypes.number.isRequired,
	onEditArticle: React.PropTypes.func.isRequired
}

export default EditArticle