import React from 'react'
import { connect } from 'react-redux'

import Comments from './presentational/comments'
import NewComment from './presentational/newComment'
import { toggleComments, editingComment, editComment } from './articleActions'

// This is the container components for comments and edit options

// Comments container
const commentsContainer = (id) => connect(
	(state) => {
		const article = state.article.articles.find(
			(article) => article._id === id)
		return { 
			username: state.auth.username, 
			hideComments: article.hideComments,
			comments: article.comments
		}
	},
	(dispatch) => ({
		toggleHide: () => dispatch(toggleComments(id)),
		onEditing: (commentId, editing) => 
			dispatch(editingComment(id, commentId, editing)),
		onEdit: (commentId, text) => dispatch(editComment(id, text, commentId))
	})
)(Comments)

// Comment post container
const newCommentContainer = (id) => connect(
	null,
	(dispatch) => ({
		onComment: (text) => dispatch(editComment(id, text, -1))
	})
)(NewComment)

// Wrapper of the above three
const ArticleCommentsContainer = ({ id }) => {
	const NewComment = newCommentContainer(id)
	const Comments = commentsContainer(id)
	return (
	<div className='extra content'>
		<NewComment />
		<Comments />
	</div>)
}

export default ArticleCommentsContainer