import React from 'react'

// The presentational component for posting new articles
const NewArticle = ({ onPostArticle }) => {
	let newArticleInput
	return (
		<form className='ui form'>
			<div className='field'>
				<textarea placeholder='New Article'
					ref={ (node) => newArticleInput = node} />
			</div>
			<div className='inline fields'>
				<div className='field'>
					<button className='ui primary button' onClick={ (e) => {
							e.preventDefault()
							onPostArticle(newArticleInput.value)
							newArticleInput.value = ''
						} 
					}>Post</button>
				</div>
				<div className='field'>
					<button className='ui button' onClick={ (e) => {
						e.preventDefault()
						newArticleInput.value = '' 
					} }>
						Cancel
					</button>
				</div>
			</div>
		</form>
	)
}

NewArticle.propTypes = {
	onPostArticle: React.PropTypes.func.isRequired
}

export default NewArticle