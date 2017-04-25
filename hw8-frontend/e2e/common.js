import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.creds = {
    username: 'xc12test',
    password: 'fort-highest-ourselves'
}

exports.login = () =>
    sleep(500)
        .then(findId('login').click())
        .then(findId('username').clear())
        .then(findId('password').clear())
        .then(findId('username').sendKeys(exports.creds.username))
        .then(findId('password').sendKeys(exports.creds.password))
        .then(findId('submit').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(500)
        .then(findId('logout').click())
        .then(sleep(2000))
        .then(findId('landingNavigation'))

exports.toProfile = () =>
    sleep(500)
        .then(findId('toProfile').click())
        .then(sleep(500))
        .then(findId('profileNavigation'))
