import React from 'react'
import './dashboard.css'
import { logout } from '../../actions/auth.action'
import { connect } from 'react-redux'

const dashboard = ({ logout, user, loading }) => {
	const onLogout = () => {
		logout()
	}
	return (
		!loading && (
			<div className='d-flex flex-col h-100 w-100 align-items-center justify-content-center'>
				<h2>Welcome , {user ? user.name : 'loading...'}</h2>
				<button className='btn btn-primary' onClick={onLogout}>
					{' '}
					Logout
				</button>
			</div>
		)
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.auth.user,
		loading: state.auth.loading
	}
}
export default connect(mapStateToProps, { logout })(dashboard)
