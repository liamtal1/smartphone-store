import React, {useState, useEffect} from 'react';
import './App.css';

// load css
import './stylesheets/login.css';
import './stylesheets/navbar.css';
import './stylesheets/products.css';
import './stylesheets/cart.css';

import {BrowserRouter, Route, NavLink, withRouter} from 'react-router-dom';

import Cookie from 'js-cookie';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';

import NavBar from './components/Navbar';

function App() {
	const user = Cookie.get('user');
	const [cart, setCart] = useState([]);
	const [amount, setAmount] = useState({});

	const addItem = (product, value) => {
		amount[product.Model] = value;
		setAmount({...amount});
	};

	const addToCart = product => {
		const newCart = [...cart];
		const existsProduct = cart.find(p => p.Model === product.Model);
		if (existsProduct) {
			addItem(product, amount[product.Model] + 1);
		} else {
			// new
			newCart.push(product);
			addItem(product, 1);
			setCart(newCart);
		}
	};

	const logOut = event => {
		event.preventDefault();
		Cookie.remove('user');
		window.location.replace('/login');
	};
	return (
		<div>
			{user && (
				<div className='topnav'>
					<NavLink to='/' exact>
						Home
					</NavLink>
					<NavLink to='/cart'>Cart</NavLink>
					<a href='#' className='href' onClick={logOut}>
						log out
					</a>
				</div>
			)}

			<Route path='/login' exact component={Login} />
			<Route path='/register' exact component={Register} />
			<Route
				path='/cart'
				exact
				render={() => <Cart cart={cart} addItem={addItem} amount={amount} />}
			/>
			<Route path='/' exact render={() => <Home addToCart={addToCart} />} />
		</div>
	);
}

// Home(name) === <Home name={name} />

export default withRouter(App);
