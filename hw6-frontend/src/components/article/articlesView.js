import React from 'react'

import ArticlesContainer, { SearchArticleContainer, NewArticleContainer }
	from './container/articlesContainer'

// The main article container view
const ArticlesView = () => (
	<div>
		<NewArticleContainer />
		<SearchArticleContainer />
		<ArticlesContainer />
	</div>
)

export default ArticlesView