import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../../actions/auth.action'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify'
const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})
	const changeHandler = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const submitHandler = e => {
		e.preventDefault()
		// login('dragons.winterfell@gmail.com', '123456')
		if (email !== '' && password !== '') login(email, password)
		else toast.error('Please fill all the fields')
	}
	const { email, password } = formData

	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />
	}
	return (
		<div className='h-100 d-flex align-items-center justify-content-center flex-col'>
			<ToastContainer autoClose={2500} />
			<form className='form-container' onSubmit={submitHandler}>
				<p>
					New here?
					<Link className='link' to='/register'>
						{' '}
						Sign up instead
					</Link>
				</p>
				<label htmlFor='emailInput'>Email</label>
				<input
					type='text'
					id='emailInput'
					value={email}
					onChange={changeHandler}
					name='email'
					className='text-input'
					placeholder='Enter your email'
				/>
				<label htmlFor='passwordInput'>Password</label>
				<input
					type='password'
					id='passwordInput'
					name='password'
					value={password}
					onChange={changeHandler}
					className='text-input'
					placeholder='Enter your password'
				/>

				<button type='submit' className='btn btn-primary'>
					Log in
				</button>
			</form>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	}
}

export default connect(mapStateToProps, { login })(Login)
