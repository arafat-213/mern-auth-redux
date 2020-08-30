import {
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	USER_LOADED,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
	AUTH_ERROR
} from '../actions/types'
const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	loading: true,
	user: null
}

export default function (state = initialState, action) {
	const { type, payload } = action
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			}
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token)
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			}
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case LOGOUT:
		case AUTH_ERROR:
			localStorage.removeItem('token')
			return {
				...state,
				isAuthenticated: false,
				token: null,
				loading: false,
				user: null
			}
		default:
			return state
	}
}
