// This file contains all validation functions

// Error message literals
export const errors = {
	username: 'Username must start with a letter and only contain ' + 
				'letters and digits)',
	password: 'Password cannot be empty',
	email: 'Email must be of form "X@Y"',
	dob: 'You have to be at least 18 years old, and birthday ' + 
			'needs to be of form MM/DD/YYYY',
	zipcode: 'Zipcode must be 5 digits'
}

const validateUsername = (username) => 
	username && username !== '' &&
		username[0].match(/([a-z]|[A-Z])/) &&
		username.match(/^\w+$/)

const validatePassword = (password) => password && password !== ''

const validateEmail = (email) => email && email.match(/^[^@]+@[^@]+$/)

const validateBirthday = (bday) => {
	if (!bday || bday.length !== 10) {
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
	if (today.getFullYear() - year < 18 || 
		(today.getFullYear() - year === 18 &&
		(today.getMonth() + 1 < month || (today.getMonth() + 1 === month &&
			today.getDate() < day)))) {
		return false
	}
	return true
}

const validateZip = (zip) => zip && zip.length === 5 && zip.match(/^\d{5}$/)

const validate = (type, userInfo) => {
	switch (type) {
		case 'username':
			return validateUsername(userInfo.username)
		case 'password':
			return validatePassword(userInfo.password)
		case 'email':
			return validateEmail(userInfo.email)
		case 'dob':
			return validateBirthday(userInfo.dob)
		case 'zipcode':
			return validateZip(userInfo.zipcode)
		default:
			return false
	}
}

export default validate