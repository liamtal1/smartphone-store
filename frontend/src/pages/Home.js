import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';

function Home(props) {
	const {products} = props;
	const user = Cookies.get('user');

	if (!user) {
		return <Redirect to='/login' />;
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
