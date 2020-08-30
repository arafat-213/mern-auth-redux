const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})
		console.log('Databse connected')
	} catch (error) {
		console.log('Connect DB', error)
		process.exit(1)
	}
}

module.exports = connectDB
