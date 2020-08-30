const express = require('express')
const {
	registerValidator,
	loginValidator
} = require('../helpers/validationHelper')
const {
	registerController,
	loginController,
	getAuthController
} = require('../controllers/user.controller')

const auth = require('../middleware/auth.middleware')
const router = express.Router()

/*
 * @route POST api/user/register
 * @desc Register user
 * @access Public
 */
router.post('/user/register', registerValidator, registerController)
/*
 * @route POST api/user/register
 * @desc Register user
 * @access Public
 */
router.post('/user/login', loginValidator, loginController)

router.get('/user/auth', auth, getAuthController)
module.exports = router
