import React from 'react'

// The presentational component for stylized file input entry
const StylizedFileInput = ({ fileHandler, text='Open File' }) => (
	<div>
	    <label htmlFor={ 'file' + text }
	    	className='ui button file-input-label'>
	    	{ text }
	    </label>
	    <input type='file' accept="image/*"
	    	id={ 'file' + text } className='hide'
	    	onChange={ (e) => fileHandler(e.target.files[0]) }/>
	</div>
)

StylizedFileInput.propTypes = {
	fileHandler: React.PropTypes.func.isRequired
}

export default StylizedFileInput