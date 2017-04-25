import React from 'react';

import ArticlesView from '../article/ArticlesView'
import HeadlineView from './headlineView'
import FollowingView from './followingView'
import { MainNavigation } from './container/mainContainer'

// The main page container component
const Main = () => (
	<div>
		<MainNavigation />
		<div className='ui two column grid'>
			<div className='row'>
				<div className='five wide column left-column'>
					<HeadlineView />
					<FollowingView />
				</div>
				<div className='eleven wide column right-column'>
					<ArticlesView />
				</div>
			</div>
		</div>
	</div>
)

export default Main