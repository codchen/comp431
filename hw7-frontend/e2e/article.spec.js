import { expect } from 'chai'
import { go, sleep, findId, getChildren, findIdChildren } from './selenium'
import common from './common'


describe('Test article', () => {
    before('should log in and go to main page', (done) => {
        go().then(common.login).then(done).catch(done)
    })

    it('should post a new article and update in the feed', (done) => {
        const content = 'new post'
        sleep(500)
            .then(findId('newArticleTf').clear())
            .then(findId('newArticleTf').sendKeys(content))
            .then(findId('newArticleSubmit').click())
            .then(sleep(2000))
            .then(() => findId('articles'))
            .then((articles) => getChildren(articles))
            .then((rows) => getChildren(rows[0]))
            .then((columns) => getChildren(columns[0]))
            .then((article) => findIdChildren(article[0], 'text'))
            .then((text) => text.getText())
            .then((text) => {
                expect(text).to.equal(content)
            })
            .then(done)
            .catch(done)
    })

    it('should filter articles', (done) => {
        const content = 'Only One Article Like This'
        sleep(500)
            .then(findId('select').click())
            .then(sleep(500))
            .then(findId('option-1').click())
            .then(sleep(500))
            .then(findId('searchTf').clear())
            .then(findId('searchTf').sendKeys(content))
            .then(findId('searchSubmit').click())
            .then(sleep(500))
            .then(() => findId('articles'))
            .then((articles) => getChildren(articles))
            .then((rows) => getChildren(rows[0]))
            .then((columns) => getChildren(columns[0]))
            .then((article) => findIdChildren(article[0], 'text'))
            .then((text) => text.getText())
            .then((text) => {
                expect(text).to.have.string(content)
            })
            .then(() => findId('articles'))
            .then((articles) => getChildren(articles))
            .then((rows) => getChildren(rows[0]))
            .then((columns) => getChildren(columns[0]))
            .then((article) => findIdChildren(article[0], 'author'))
            .then((text) => text.getText())
            .then((text) => {
                expect(text).to.equal('xc12test')
            })
            .then(findId('select').click())
            .then(sleep(500))
            .then(findId('option-0').click())
            .then(sleep(500))
            .then(findId('searchSubmit').click())
            .then(done)
            .catch(done)
    })

    it('should edit an article and update in the feed', (done) => {
        const content = 'edit'
        sleep(500)
            .then(() => findId('articles'))
            .then((articles) => getChildren(articles))
            .then((rows) => getChildren(rows[0]))
            .then((columns) => getChildren(columns[0]))
            .then((article) => findIdChildren(article[0], 'editArticle')
                .click())
            .then(sleep(500))
            .then(findId('editArticleTf').clear())
            .then(findId('editArticleTf').sendKeys(content))
            .then(findId('editArticleSubmit').click())
            .then(sleep(2000))
            .then(() => findId('articles'))
            .then((articles) => getChildren(articles))
            .then((rows) => getChildren(rows[0]))
            .then((columns) => getChildren(columns[0]))
            .then((article) => findIdChildren(article[0], 'text'))
            .then((text) => text.getText())
            .then((text) => {
                expect(text).to.equal(content)
            })
            .then(done)
            .catch(done)
    })
})