import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Checkout from '../components/Checkout';

function Cart(props) {
	console.log('props', props);
	const {cart} = props;
	const [checkoutOpen, setCheckoutOpen] = useState(true);

	let globalTotal = 0;

	const close = () => {
		setCheckoutOpen(false);
	};

	const cartView = cart.map((product, i) => {
		const total = props.amount[product.Model] * product.price;
		globalTotal += total;
		return (
			<tr key={i}>
				<td>
					<img src={product.imageUrl} alt='' />
				</td>
				<td>{product.Model}</td>
				<td>{product.price}</td>
				<td>
					<input
						min='0'
						max={product.quantity}
						type='number'
						onChange={e => props.addItem(product, e.target.value)}
						value={props.amount[product.Model] || 1}
					/>
				</td>
				<td>{total}</td>
			</tr>
		);
	});
	return (
		<div className='cart'>
			<table>
				<thead>
					<tr>
						<th>image</th>
						<th>model</th>
						<th>price</th>
						<th>amount</th>
						<th>total</th>
					</tr>
				</thead>
				<tbody>{cartView}</tbody>
			</table>
			<div className='summary'>
				<span>To pay: {globalTotal}$</span>
				<button onClick={() => setCheckoutOpen(true)}>Checkout</button>
				<Checkout open={checkoutOpen} close={close} />
			</div>
		</div>
	);
}

export default Cart;
