import React from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Landing = ({ isAuthenticated }) => {
	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />
	}
	return (
		<div className='h-100 d-flex align-items-center flex-col justify-content-center'>
			<h1>Welcome to MERN Auth</h1>
			<h3>Minimal authentication app built on MERN stack</h3>
			<div className='d-flex flex-row'>
				<Link to='/login'>
					<button className='btn btn-primary'>Log in</button>
				</Link>
				<Link to='/register'>
					<button className='btn btn-primary'>Sign up</button>
				</Link>
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	}
}
export default connect(mapStateToProps)(Landing)
