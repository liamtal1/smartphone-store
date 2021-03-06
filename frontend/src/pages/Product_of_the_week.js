import React, {useEffect, useState} from 'react';
import '../stylesheets/track.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';


function ProductOfTheWeek(props) {
	const user = Cookies.get('user');

	let [products, setProducts] = useState([]);

	useEffect(() => {
		async function fetchLogs() {
			try {
				const res = await axios('http://localhost:3000/products');
				console.log(res);
				setProducts(res.data);
			} catch (err) {
				console.log('fetchLogs err', err.message);
			}
		}
		fetchLogs();
	}, []);

	console.log('products', products);
	let product = products[0] || {};

	products.forEach(p => {
		if (p.totalOrder > product.totalOrder) {
			product = p;
		}
	});
	if (!user) {
		return <Redirect to='/login' />;
	}

	return (<div className='content'>
			<img src={product.imageUrl} alt='Mountains' />
			<h3>
				{product.Model} {product.price}$
			</h3>
			<div>
				<button onClick={() => props.addToCart(product)}>Add to cart</button>
			</div>
		</div>);
}
export default ProductOfTheWeek;
