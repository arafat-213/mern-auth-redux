const { validationResult } = require('express-validator')
const User = require('../models/user.model')

module.exports = {
	registerController: async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res.status(400).json({
					error: errors.array().map(error => error.msg)[0]
				})
			const { name, email, password } = req.body
			let user = await User.findOne({ email })
			if (user)
				return res.status(400).json({
					error: 'Email is already taken'
				})
			user = new User({ name, email, password })
			const token = user.generateAuthToken()
			await user.save()
			delete user.password
			delete user.resetPasswordLink
			res.status(201).json({ success: true, user, token })
		} catch (e) {
			console.log(e)
			return res.status(400).json({
				error: e.message
			})
		}
	},
	loginController: async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res.status(400).json({
					error: errors.array().map(error => error.msg)[0]
				})
			const { email, password } = req.body
			const user = await User.findByCredentials(email, password)
			if (!user) return res.status(400).json({ error: 'Bad credentials' })
			const token = user.generateAuthToken()
			res.json({
				success: true,
				token
			})
		} catch (e) {
			console.log(e)
			res.status(400).json({ error: e.message })
		}
	},
	getAuthController: async (req, res) => {
		try {
			// find user in db for the token
			const user = await User.findById(req.user)
			res.json(user)
		} catch (error) {
			console.log(error)
			res.status(500).json({ error: 'Server error' })
		}
	}
}
