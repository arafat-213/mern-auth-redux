import React, { useEffect } from 'react'
import Landing from './Pages/Landing'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import PrivateRoute from './routing/PrivateRoute'
import Dashboard from './Pages/dashboard/Dashboard'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth.action'

if (localStorage.token) {
	setAuthToken(localStorage.token)
}
const App = () => {
	useEffect(() => {
		store.dispatch(loadUser())
	})
	return (
		<Provider store={store}>
			<Router>
				<Route exact path='/register' component={Signup} />
				<Route exact path='/login' component={Login} />
				<PrivateRoute exact path='/dashboard' component={Dashboard} />
				<Route exact path='/' component={Landing} />
			</Router>
		</Provider>
	)
}

export default App
