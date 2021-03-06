import React, {useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

function Login(props) {
	const [fields, setFields] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	function handleChange(event) {
		// when input change value
		let name = event.target.name;
		let value = event.target.value;
		console.log(name, value);
		setFields({
			...fields, //copy to object
			[name]: value, // + change
		});
	}
	if (!props.open) {
		return null;
	}
	return (
		<div id='id01' className=''>
			<div className='modal-content animate'>
				<div className='imgcontainer'>
					<center><img src='https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-1/254000/09-512.png'
								 width={600}
								 height={600}
						alt='Avatar'
						className='avatar'
					/></center>
				</div>

				<div className='container'>
					<label htmlFor='uname'>
						<b>Card Number</b>
					</label>
					<input
						type='text'
						placeholder='card number'
						name='cardNumber'
						onChange={handleChange}
						required
					/>

					<label htmlFor='psw'>
						<b>Date</b>
					</label>
					<input
						type='month'
						min='2019-09'
						placeholder='Enter Date'
						name='date'
						onChange={handleChange}
						required
					/>

					<label htmlFor='psw'>
						<b>CVV</b>
					</label>
					<input
						type='number'
						placeholder='Enter CVV'
						name='cvv'
						onChange={handleChange}
						required
					/>

					<button type='submit' onClick={props.onBuy} > Buy </button>
					<button type='submit' onClick={props.close}> Cancel </button>
				</div>
			</div>
		</div>
	);
}

export default Login;
