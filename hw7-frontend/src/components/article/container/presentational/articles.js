import React from 'react'
import Article from './article.js'

// The collection of all fed articles displayed in a two-column grid
const Articles = ({ username, articles, EditArticle, Comments }) => (
	<div className='ui two column grid' id='articles'>
		{
			[...Array(Math.floor((articles.length + 1) / 2))].map((x, i) => (
				<div className='row' key={i}>
					<div className='column'>
						<Article key={ articles[2 * i]._id }
							article={ articles[2 * i] }
							EditArticle={ EditArticle }
							Comments={ Comments }
							showEdit={
								username === articles[2 * i].author }
						/>
					</div>
					<div className='column'>
						{
							// Extra check here for odd-number articles
							2 * i + 1 < articles.length &&
							<Article key={ articles[2 * i + 1]._id }
								article={ articles[2 * i + 1] }
								EditArticle={ EditArticle }
								Comments={ Comments }
								showEdit={
									username === articles[2 * i + 1].author }
							/>
						}
					</div>
				</div>
			))
		}
	</div>
)

Articles.propTypes = {
	username: React.PropTypes.string.isRequired,
	articles: React.PropTypes.array.isRequired,
	EditArticle: React.PropTypes.func.isRequired,
	Comments: React.PropTypes.func.isRequired
}

export default Articles