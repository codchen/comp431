import React from 'react'
import { expect } from 'chai'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'

import NewArticle
    from '../../src/components/article/container/presentational/newArticle'
import Articles
    from '../../src/components/article/container/presentational/articles'

describe('ArticlesView', () => {
	const articles = [
		{
			_id: 0,
			author: 'Tony',
			comments: [],
			date: new Date('01/01/1980'),
			img: 'dummy',
			text: '123',
			hide: true
		}, {
			_id: 1,
			author: 'Seb',
			comments: [],
			date: new Date('02/01/1999'),
			img: '',
			text: '456',
			hide: true
		}
	]

	it('should render articles', (done) => {
		const node = TestUtils.renderIntoDocument((<div>
            <Articles articles={ articles } rowNum={1}
            	articleExtra={ () => () => <div></div> }/>
        </div>))
        const articlesRow = findDOMNode(node).children[0].children[0]
        expect(articlesRow.children.length).to.eql(articles.length)
        const article = articlesRow.children[0].children[0]
        expect(article.children.length).to.eql(3)
        const main = article.children[1]
        expect(main.children.length).to.eql(3)
        const author = main.children[0]
        expect(author.innerHTML).to.eql(articles[0].author)
        const date = main.children[1].children[0]
        expect(date.innerHTML).to.eql(articles[0].date.toJSON())
        const text = main.children[2]
        expect(text.innerHTML).to.eql(articles[0].text)
        done()
	})

	it('should dispatch actions to create a new article', (done) => {
		let article = 'not created yet'
		const newArticle = (text) => article = text
		const newText = 'new article'
		const node = TestUtils.renderIntoDocument((<div>
            <NewArticle onPostArticle={ newArticle }/>
        </div>))
        const form = node.children[0]
        const tf = form.children[0].children[0]
        tf.value = newText
        const btn = form.children[1].children[0].children[0]
        TestUtils.Simulate.click(btn)
        expect(article).to.eql(newText)
        const cancel = form.children[1].children[1].children[0]
        TestUtils.Simulate.click(cancel)
        TestUtils.Simulate.click(btn)
        expect(article).to.eql('')
        done()
	})
})