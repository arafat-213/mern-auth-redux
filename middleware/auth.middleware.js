const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	// Get token from req header
	const token = req.header('x-auth-token')

	if (!token)
		return res
			.status(401)
			.json({ message: 'User not authenticated, Access denied' })

	// Verify token
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		// token is valid
		req.user = decoded._id
		next()
	} catch (error) {
		// Invalid token
		return res
			.status(401)
			.json({ error: 'User not authenticated, Access denied' })
	}
}
