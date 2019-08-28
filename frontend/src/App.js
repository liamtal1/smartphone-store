import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

// load css
import './stylesheets/login.css';

import {BrowserRouter, Route, NavLink} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';

function App() {
	return (
		<BrowserRouter>
			<div className='navbar'>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/register'>Register</NavLink>
				<NavLink to='/login'>Login</NavLink>
				<NavLink to='/cart'>Cart</NavLink>
			</div>
			<Route path='/' exact component={Home} />
			<Route path='/login' exact component={Login} />
			<Route path='/register' exact component={Register} />
			<Route path='/cart' exact component={Cart} />
		</BrowserRouter>
	);
}

// Home(name) === <Home name={name} />

export default App;
