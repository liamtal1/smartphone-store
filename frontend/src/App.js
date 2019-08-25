import React from 'react';
import logo from './logo.svg';
import './App.css';

// load css
import './stylesheets/login.css';

import {BrowserRouter, Route, NavLink} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
	return (
		<BrowserRouter>
			<div className='navbar'>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/register'>Register</NavLink>
				<NavLink to='/login'>Login</NavLink>
			</div>
			<Route path='/' exact component={Home} />
			<Route path='/login' exact component={Login} />
			<Route path='/register' exact component={Register} />
		</BrowserRouter>
	);
}

// Home(name) === <Home name={name} />

export default App;
