import React from 'react'

// The card to display a single article.
// 'Comments' is an injected container component that wraps the needed
// callbacks so this presentational component ('Article') does not need to 
// see functions that it will not use directly.
const Article = ({ article, EditArticle, Comments, showEdit }) => {
	return (
	<div className='ui fluid card'>
		{article.img && <img className='ui big image' src={ article.img } />}
		<div className='content'>
			<div className='header' id='author'>{ article.author }</div>
			<div className='meta'>
		        <span className='date'>{ article.date.toJSON() }</span>
		    </div>
		    <div className='description' id='text'>{ article.text }</div>
		</div>
		<div className={ 'extra content' + (showEdit ? '' : ' hide') }>
			<EditArticle text={ article.text } id={ article._id }/>
		</div>
		<Comments id={ article._id }/>
	</div>
)}

Article.propTypes = {
	article: React.PropTypes.object.isRequired,
	EditArticle: React.PropTypes.func.isRequired,
	Comments: React.PropTypes.func.isRequired,
	showEdit: React.PropTypes.bool.isRequired
}

export default Article