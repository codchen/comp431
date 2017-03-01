import React from 'react'

// The presentational component for stylized file input entry
const StylizedFileInput = () => (
	<div>
	    <label htmlFor='file' className='ui button file-input-label'>
	        Open File</label>
	    <input type='file' id='file' />
	</div>
)

export default StylizedFileInput