import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Cart(props) {
	const {cartItems = []} = props;

	const cartItemsView = cartItems.map((product, index) => {
		console.log(cartItemsView);
		return (
			<div className='product' key={index}>
				sadas
			</div>
		);
	});
	return <div>{cartItemsView}</div>;
}

export default Cart;
