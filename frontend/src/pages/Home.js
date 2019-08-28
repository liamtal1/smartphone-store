import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

function Home(props) {
	const user = Cookies.get('user');
	console.log('user', user);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function getProduct() {
			try {
				const response = await axios('http://localhost:3001/products');
				console.log('data', response);
				setProducts(response.data);
			} catch (err) {
				console.log('getProduct error', err.message);
			}
		}

		getProduct();
		// load products after first render
	}, []);

	if (!user) {
		// return <Redirect to='/login' />
	}
	if (products.length < 1) {
		return 'loading....';
	}

	const productsView = products.map((product, index) => {
		console.log(product);
		return (
			<div className='product' key={index}>
				<div>{product.Brand}</div>
				<div>{product.Compatibility}</div>
				<div>
					<img src={product.imageUrl} alt='pic' width='300' height='300' />
				</div>
				<div>
					<button>add to cart </button>
				</div>
			</div>
		);
	});
	return <div>{productsView}</div>;
}

export default Home;
