import React from 'react'

// The card to display a single article.
// 'articleExtra' is an injected container component that wraps the needed
// callbacks so this presentational component ('Article') does not need to 
// see functions that it will not use directly.
const Article = ({ article, articleExtra }) => {
	// Extra card content to display edit options and comments
	const Extra = articleExtra(article._id, article.hide,
		article.comments, article.text)
	return (
	<div className='ui fluid card'>
		{article.img && <img className='ui big image' src={ article.img } />}
		<div className='content'>
			<div className='header'>{ article.author }</div>
			<div className='meta'>
		        <span className='date'>{ article.date.toJSON() }</span>
		    </div>
		    <div className='description'>{ article.text }</div>
		</div>
		<Extra />
	</div>
)}

Article.propTypes = {
	article: React.PropTypes.object.isRequired,
	articleExtra: React.PropTypes.func.isRequired
}

export default Article