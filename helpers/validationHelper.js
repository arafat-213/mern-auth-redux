const { check } = require('express-validator')

// User registration
exports.registerValidator = [
	check('name', 'Name is required').not().isEmpty(),
	check('email', 'Email is required').isEmail(),
	check('password', 'Password is required').not().isEmpty(),
	check('password')
		.isLength({
			min: 6
		})
		.withMessage('Password must contain at least 6 characters')
		.matches(/\d/)
		.withMessage('Password must contain a number')
]

exports.loginValidator = [
	check('email', 'Please enter a valid email').isEmail(),
	check('password', 'Password is required').not().isEmpty()
]
