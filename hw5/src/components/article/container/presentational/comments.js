import React from 'react'

// The collection of all comments of a single article and whether to display
const Comments = ({ hide, comments, toggleHide }) => (
	<div>
		<div className={ hide ? 'ui checked checkbox' : 'ui checkbox'}
			onClick={ () => toggleHide() }>
			<input type='checkbox' className='hidden'
				readOnly checked={ hide } />
			<label>{ 'Hide comments' }</label>
		</div>
		<div className={ hide ? 'ui collapsed comments' : 'ui comments' }>
			{
				comments.map((comment, i) => (
					<div key={i} className='comment'>
						<div className='conttent'>
							<div className='author'>
								{ comment.author }
							</div>
							<div className='metadata'>
								{ comment.date }
							</div>
							<div className='text'>
								{ comment.text }
							</div>
						</div>
					</div>
				))
			}
		</div>
	</div>
)

Comments.propTypes = {
	hide: React.PropTypes.bool.isRequired,
	comments: React.PropTypes.array.isRequired,
	toggleHide: React.PropTypes.func.isRequired
}

export default Comments