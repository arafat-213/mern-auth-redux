import axios from 'axios'
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
	AUTH_ERROR
} from './types'
import setAuthToken from '../utils/setAuthToken'
import { toast } from 'react-toastify'

export const register = (name, email, password) => async dispatch => {
	try {
		const res = await axios.post('/api/user/register', {
			name,
			email,
			password
		})
		toast.success('user loaded')
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		})
	} catch (error) {
		toast.error(error.response.data.error)
		dispatch({
			type: REGISTER_FAIL
		})
	}
}
export const login = (email, password) => async dispatch => {
	try {
		const res = await axios.post('api/user/login', {
			email,
			password
		})
		setAuthToken(res.data.token)
		toast.success('Log in successful! Welcome :) ')
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		})
		dispatch(loadUser())
	} catch (error) {
		toast.error(error.response.data.error)
		dispatch({
			type: LOGIN_FAIL
		})
	}
}

export const loadUser = () => async dispatch => {
	if (localStorage.token) setAuthToken(localStorage.token)
	try {
		const res = await axios.get('api/user/auth')
		dispatch({
			type: USER_LOADED,
			payload: res.data
		})
	} catch (error) {
		dispatch({
			type: AUTH_ERROR
		})
	}
}

export const logout = () => async dispatch => {
	dispatch({
		type: LOGOUT
	})
}
