import React from 'react';

// The presentational component to search articles
const SearchArticle = ({ options }) => {
	let searchInput
	// default callback
	let onSearch = (_) => _
	return (
		<form className='ui form'>
			<div className='inline fields'>
				<div className='field'>
					<input type='text' placeholder='Search posts...'
						id='searchTf'
						ref={ (node) => searchInput = node } />
				</div>
				<div className='field'>
					<select id='select' onChange={(e) => 
						onSearch = options.find((o) =>
							o.text === e.target.value).callback}>
						{
							options.map((option, i) => (
								<option key={ option.text }
										id={ 'option-' + i }
										className='ui dropdown'
										value={ option.text }>
									{ option.text }
								</option>))
						}
					</select>
				</div>
				<div className='field'>
					<button className='ui button'
						id='searchSubmit'
						onClick={(e) => {
							e.preventDefault()
							onSearch(searchInput.value)} }>Search</button>
				</div>
			</div>
		</form>
	)
}

SearchArticle.propTypes = {
	options: React.PropTypes.array.isRequired
}

export default SearchArticle