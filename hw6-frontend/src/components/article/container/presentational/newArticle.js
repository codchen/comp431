import React from 'react'

import StylizedFileInput from '../../../common/stylizedFileInput'

// The presentational component for posting new articles
const NewArticle = ({ onPostArticle }) => {
	let newArticleInput
	let imageInput
	return (
		<form className='ui form'>
			<div className='field'>
				<textarea placeholder='New Article'
					id='newArticleTf'
					ref={ (node) => newArticleInput = node} />
			</div>
			<div className='inline fields'>
				<div className='field'>
					<button className='ui left labeled icon primary button'
							id='newArticleSubmit'
							onClick={ (e) => {
								e.preventDefault()
								onPostArticle(newArticleInput.value,
									imageInput)
								newArticleInput.value = ''
							} 
					}><i className='edit icon'/>Post</button>
				</div>
				<div className='field'>
					<StylizedFileInput fileHandler={
						(file) => imageInput = file }
						text='Upload a picture'/>
				</div>
				<div className='field'>
					<button className='ui button'
						onClick={ (e) => {
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