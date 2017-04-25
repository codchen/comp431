import React from 'react'
import Comment from './comment'

// The collection of all comments of a single article and whether to display
const Comments = (
	{ username, hideComments, comments, toggleHide, onEditing, onEdit }
) => (
	<div>
		<div className={ hideComments ? 'ui checked checkbox' : 'ui checkbox'}
			onClick={ () => toggleHide() }>
			<input type='checkbox' className='hidden'
				readOnly checked={ hideComments } />
			<label>{ 'Hide comments' }</label>
		</div>
		<div className={ hideComments ?
			'ui collapsed comments' : 'ui comments' }>
			{
				comments.map((comment, i) =>
					(<Comment key={ i }
						comment={ comment }
						showEdit={ username === comment.author }
						onEditing={ onEditing }
						onEdit={ onEdit }/>)
				)
			}
		</div>
	</div>
)

Comments.propTypes = {
	username: React.PropTypes.string.isRequired,
	hideComments: React.PropTypes.bool.isRequired,
	comments: React.PropTypes.array.isRequired,
	toggleHide: React.PropTypes.func.isRequired,
	onEditing: React.PropTypes.func.isRequired,
	onEdit: React.PropTypes.func.isRequired
}

export default Comments