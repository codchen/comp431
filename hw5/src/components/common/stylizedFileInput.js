import React from 'react'

// The presentational component for stylized file input entry
const StylizedFileInput = ({ fileHandler }) => (
	<div>
	    <label htmlFor='file' className='ui button file-input-label'>
	        Open File</label>
	    <input type='file' accept="image/*" id='file'
	    	onChange={ (e) => fileHandler(e.target.files[0]) }/>
	</div>
)

StylizedFileInput.propTypes = {
	fileHandler: React.PropTypes.func.isRequired
}

export default StylizedFileInput