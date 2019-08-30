import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

function Home(props) {
	const user = Cookies.get('user');
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function getProduct() {
			try {
				const response = await axios('http://localhost:3000/products');
				setProducts(response.data);
			} catch (err) {
				console.log('getProduct error', err.message);
			}
		}

		getProduct();
		// load products after first render
	}, []);

	if (!user) {
		return <Redirect to='/login' />
	}
	if (products.length < 1) {
		return 'loading....';
	}

	const productsView = products.map((product, index) => {
		return (
			<div className='column' key={index}>
				<div className='content'>
					<img src={product.imageUrl} alt='Mountains' />
					<h3>
						{product.Model} {product.price}$
					</h3>
					<div>
						<button onClick={() => props.addToCart(product)}>Add to cart</button>
					</div>
				</div>
			</div>
		);
	});
	return (
		<div className='main'>
			<div className='row'>{productsView}</div>
		</div>
	);
}

export default Home;
