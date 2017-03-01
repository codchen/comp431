// This file contains all validation functions

export const validateLogin = (username, password) => {
	let result = {}
	result.username = username && username !== ''
	result.password = password && password !== ''
	return result
}

export const validateUsername = (username) =>
	username !== '' && username[0].match(/([a-z]|[A-Z])/) && username.match(/^\w+$/)

export const validatePassword = (password) => password !== ''

export const validateEmail = (email) => email.match(/^[^@]+@[^@]+$/)

export const validatePhone = (phone) => phone.length === 10 && phone.match(/^\d{10}$/)

export const validateBirthday = (bday) => {
	if (bday.length !== 10) {
		return false
	}
	let month = bday.substring(0,2)
	let day = bday.substring(3,5)
	let year = bday.substring(6,10)
	if (!month.match(/^\d{2}$/) || !day.match(/^\d{2}$/) ||
		!year.match(/^\d{4}$/) || bday[2] !== "/" || bday[5] !== "/") {
		return false
	}
	month = parseInt(month)
	day = parseInt(day)
	year = parseInt(year)
	if (month < 1 || month > 12 || day < 1 || day > 31 || 
		((month === 4 || month === 6 || month === 9 || month === 11) &&
			day === 31) || (month === 2 && (day === 30 || 
				((year % 4 !== 0 || (year % 100 === 0 &&
					year % 400 !== 0)) && day === 29)))) {
		return false
	}
	let today = new Date()
	if (today.getFullYear() - year < 18 || (today.getFullYear() - year === 18 &&
		(today.getMonth() + 1 < month || (today.getMonth() + 1 === month &&
			today.getDate() < day)))) {
		return false
	}
	return true
}

export const validateZip = (zip) => zip.length === 5 && zip.match(/^\d{5}$/)