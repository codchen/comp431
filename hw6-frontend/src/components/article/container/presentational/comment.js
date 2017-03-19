import React from 'react'

// The presentational component  of a single comment
const Comment = ({ comment, showEdit, onEditing, onEdit }) => {
	let editInput
	return (
	<div className='comment'>
		<div className='content'>
			<div className='author'>
				{ comment.author }
			</div>
			<div className='metadata'>
				{ comment.date }
			</div>
			<div className='text'>
				{ comment.text }
			</div>
			<div className={ showEdit ? 'actions' : 'hide' }>
				<a className='active'
					onClick={ () => onEditing(comment.commentId, true) }
			>Edit</a>
			</div>
			<form className={ comment.editing ? 'ui reply form' : 'hide' }>
				<div className='field'>
					<textarea ref={ (node) => editInput = node}
						defaultValue={ comment.text } />
				</div>
				<button className='ui primary button'
					onClick={ (e) => {
						e.preventDefault()
						onEdit(comment.commentId, editInput.value)
						onEditing(comment.commentId, false)
					} }>
					Edit
				</button>
			</form>
		</div>
	</div>)
}

Comment.propTypes = {
	comment: React.PropTypes.object.isRequired,
	showEdit: React.PropTypes.bool.isRequired,
	onEditing: React.PropTypes.func.isRequired,
	onEdit: React.PropTypes.func.isRequired
}

export default Comment