import React from 'react'
import Article from './article.js'

// The collection of all fed articles displayed in a two-column grid
const Articles = ({ articles, rowNum, articleExtra }) => (
	<div className='ui two column grid'>
		{
			[...Array(rowNum)].map((x, i) => (
				<div className='row' key={i}>
					<div className='column'>
						<Article key={ articles[2 * i]._id }
							article={ articles[2 * i] }
							articleExtra={ articleExtra } />
					</div>
					<div className='column'>
						{
							// Extra check here for odd-number articles
							2 * i + 1 < articles.length &&
							<Article key={ articles[2 * i + 1]._id }
								article={ articles[2 * i + 1] } 
								articleExtra={ articleExtra }/>
						}
					</div>
				</div>
			))
		}
	</div>
)

Articles.propTypes = {
	articles: React.PropTypes.array.isRequired,
	rowNum: React.PropTypes.number.isRequired,
	articleExtra: React.PropTypes.func.isRequired
}

export default Articles