import React, {useState, useEffect} from 'react';
import './App.css';

// load css
import './stylesheets/login.css';
import './stylesheets/navbar.css';
import './stylesheets/products.css';
import './stylesheets/cart.css';
import './stylesheets/about us.css';
import './stylesheets/Product_of_the_week.css';
import './stylesheets/track.css';

import axios from 'axios';
import saveLog from './saveLog';

import {Route, NavLink, withRouter} from 'react-router-dom';

import Cookie from 'js-cookie';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import About_us from './pages/About_us';
import Product_of_the_week from './pages/Product_of_the_week';
import Track from './pages/Track';

function App() {
	const user = Cookie.get('user');
	const [cart, setCart] = useState([]);
	const [amount, setAmount] = useState({});
	const [filter, setFilter] = useState('');
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		async function getProduct() {
			try {
				const response = await axios('http://localhost:3000/products');
				setProducts(response.data);
				applyFilter(response.data);
			} catch (err) {
				console.log('getProduct error', err.message);
			}
		}

		getProduct();
		// load products after first render
	}, []);

	const addItem = (product, value) => {
		amount[product.Model] = value;
		setAmount({...amount});
	};

	function applyFilter(items) {
		const result = items.filter(product => {
			return (
				product.Model.toLowerCase().includes(filter.toLowerCase()) ||
				product.Brand.toLowerCase().includes(filter.toLowerCase())
			);
		});
		setFilteredProducts(result);
	}

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

		saveLog(product);
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
					<NavLink to='/About_us'> About us </NavLink>
					<NavLink to='/Product_of_the_week'> Product of the week</NavLink>
					<NavLink to='/Track'> Track</NavLink>
					<a href='#' className='href' onClick={logOut}>
						log out
					</a>

					{/*search field */}
					<div className='search-container'>
						<input
							type='text'
							onChange={e => setFilter(e.target.value)}
							placeholder='Search..'
							name='search'
						/>
						<button type='submit' onClick={() => applyFilter(products)}>
							search
						</button>
					</div>
				</div>
			)}

			<Route path='/login' exact component={Login} />
			<Route path='/register' exact component={Register} />
			<Route
				path='/cart'
				exact
				render={() => <Cart cart={cart} addItem={addItem} amount={amount} />}
			/>

			<Route
				path='/'
				exact
				render={() => <Home addToCart={addToCart} products={filteredProducts} />}
			/>
			<Route path='/About_us' exact render={() => <About_us exact component={About_us} />} />
			<Route
				path='/Product_of_the_week'
				exact
				render={() => <Product_of_the_week exact component={Product_of_the_week} />}
			/>
			<Route path='/Track' exact render={() => <Track exact component={Track} />} />
		</div>
	);
}

// Home(name) === <Home name={name} />

export default withRouter(App);
