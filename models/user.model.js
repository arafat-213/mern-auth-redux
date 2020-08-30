const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true
		},
		role: {
			type: String,
			default: 'User'
		},
		resetPasswordLink: {
			type: String,
			default: ''
		}
	},
	{ timestamp: true }
)

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })
	if (!user) throw new Error('Bad credentials')
	const isMatch = bcrypt.compareSync(password, user.password)
	if (!isMatch) throw new Error('Bad credentials')
	return user
}

userSchema.methods.generateAuthToken = function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
	return token
}

userSchema.pre('save', async function () {
	const user = this
	if (user.isModified('password'))
		user.password = bcrypt.hashSync(user.password, 8)
})

userSchema.methods.toJSON = function () {
	let obj = this.toObject()
	delete obj.password
	return obj
}
module.exports = User = mongoose.model('user', userSchema)
