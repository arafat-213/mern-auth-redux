import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../actions/auth.action'
import { toast, ToastContainer } from 'react-toastify'

const Signup = ({ register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password1: '',
		password2: ''
	})
	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />
	}

	const { email, name, password1, password2 } = formData
	const changeHandler = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const submitHandler = e => {
		e.preventDefault()
		if (
			email !== '' &&
			password1 !== '' &&
			password2 !== '' &&
			name !== ''
		) {
			if (password1 === password2) register(name, email, password1)
			else toast.error('Passwords do not match')
		} else toast.error('Please fill all the fields')
	}
	return (
		<div className='h-100 d-flex align-items-center justify-content-center flex-col'>
			<ToastContainer />
			<div className='form-container'>
				<p>
					Already have an account?
					<Link className='link' to='/login'>
						{' '}
						Log in instead
					</Link>
				</p>
				<label htmlFor='nameInput'>Name</label>
				<input
					type='text'
					id='nameInput'
					name='name'
					value={name}
					className='text-input'
					onChange={changeHandler}
					placeholder='Enter your name'
				/>
				<label htmlFor='emailInput'>Email</label>
				<input
					type='text'
					id='emailInput'
					name='email'
					value={email}
					className='text-input'
					onChange={changeHandler}
					placeholder='Enter your email'
				/>
				<label htmlFor='password1Input'>Password</label>
				<input
					type='password'
					id='password1Input'
					name='password1'
					value={password1}
					className='text-input'
					onChange={changeHandler}
					placeholder='Enter your password'
				/>
				<label htmlFor='password2Input'>Password</label>
				<input
					type='password'
					id='password2Input'
					name='password2'
					value={password2}
					className='text-input'
					onChange={changeHandler}
					placeholder='Confirm your password'
				/>
				<button className='btn btn-primary' onClick={submitHandler}>
					Sign up
				</button>
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	}
}
export default connect(mapStateToProps, { register })(Signup)
