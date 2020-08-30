const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db')

require('dotenv').config({
	path: './config/config.env'
})

const app = express()

// Use body parser
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)

app.use(bodyParser.json())

// Say hello to the database
connectDB()

// Load all routes
const userRouter = require('./routes/user.route')

// Use routes
app.use('/api', userRouter)

// Config for dev env
if (process.env.NODE_ENV === 'development') {
	app.use(
		cors({
			origin: process.env.CLIENT_URL
		})
	)
	app.use(morgan('dev'))
}

// Get port number from env
const PORT = process.env.PORT || 5000

app.get('/api/customers', (req, res) => {
	const customers = [
		{ id: 1, firstName: 'Jon', lastName: 'Snow' },
		{ id: 1, firstName: 'Tyrion', lastName: 'Lannister' },
		{ id: 1, firstName: 'Dany', lastName: 'Targaryen' }
	]
	res.json(customers)
})
// Fire up the server
app.listen(PORT, () => {
	console.log(`Server is up on port ${PORT}`)
})
