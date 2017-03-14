import React from 'react'
import { connect } from 'react-redux'

import Comments from './presentational/comments'
import EditArticle from './presentational/editArticle'
import NewComment from './presentational/newComment'
import { toggleComments, editPost, editComment } from './articleActions'

// This is the container components for comments and edit options

// Comments container
const commentsContainer = (id, hide, comments) => connect(
	(_) => ({ hide, comments }),
	(dispatch) => ({
		toggleHide: () => dispatch(toggleComments(id))
	})
)(Comments)

// Article edit container
const editArticleContainer = (text, id) => connect(
	(_) => ({ text, id }),
	(dispatch) => ({
		onEditArticle: (id, text) => dispatch(editPost(id, text))
	})
)(EditArticle)

// Comment post container
const newCommentContainer = (id) => connect(
	null,
	(dispatch) => ({
		onComment: (text) => dispatch(editComment(id, text, -1))
	})
)(NewComment)

// Wrapper of the above three
const ArticleExtraContainer = (id, hide, comments, text) =>
	connect((state) => ({
		id, hide, comments, text
	}))(({ id, hide, comments, text }) => {
	const Edit = editArticleContainer(text, id)
	const Comment = newCommentContainer(id)
	const Comments = commentsContainer(id, hide, comments)
	return (
	<div className='extra content'>
		<Edit />
		<Comment />
		<Comments />
	</div>)
})

export default ArticleExtraContainer