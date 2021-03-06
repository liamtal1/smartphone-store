import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import Checkout from '../components/Checkout';

function Cart(props) {
	const user = Cookies.get('user');
	const {cart} = props;
	const [checkoutOpen, setCheckoutOpen] = useState(false);

	let globalTotal = 0;

	async function onBuy() {
		try {
			const data = {
				cart: props.cart,
				amount: props.amount,
			};
			const resposne = await axios.post('http://localhost:3000/buy', data);
			console.log('respponse', resposne);
		} catch (err) {
			console.log(`on buy err: ${err.message}`);
		}
	}

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

	if (!user) {
		return <Redirect to='/login' />;
	}

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
				<button
					onClick={() => {
						{
							if (globalTotal > 0) setCheckoutOpen(true);
						}
					}}
				>
					Checkout
				</button>
				<Checkout open={checkoutOpen} close={close} onBuy={onBuy} />
			</div>
		</div>
	);
}

export default Cart;
