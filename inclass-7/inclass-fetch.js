// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
// Note that during the validation of the tests the browser will be
// directed to download invalid URLs which will result in error messages
// in the console:
//     GET https://webdev-dummy.herokuapp.com/badURL 404 (Not Found)
// this is expected and is not an error with your code.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        // IMPLEMENT ME
        return fetch(url,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                const contentType = res.headers.get('Content-Type')
                if (contentType.indexOf('application/json') >= 0) {
                    return res.json()
                } else {
                    return res.text().then(msg => {
                        throw new Error(msg)
                    })
                }
            })
            .then(json => {
                let result = {}
                json.articles.forEach(article => {
                    result[parseInt(article._id)] = article.text.split(' ').length
                })
                return result
            })
    }

    function countWordsSafe(url) {
        // IMPLEMENT ME
        return countWords(url)
            .then(res => res)
            .catch(err => {
                console.error(`Error inside countWordsSafe: ${err.message}`);
                return {}
            })
    }

    function getLargest(url) {
        // IMPLEMENT ME
        return countWords(url)
            .then(res => (Object.keys(res).reduce((prev, key) => (res[key] > res[prev] ? key : prev))))
            .catch(err => {
                console.error(`Error inside getLargest: ${err.message}`);
                return {}
            })
    }

    exports.inclass = {
        author: 'Tony Chen',
        countWords, countWordsSafe, getLargest
    }

})(this);
