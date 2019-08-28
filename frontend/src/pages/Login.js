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
	async function onClick() {
		try {
			const response = await axios.post('http://localhost:3001/login', {...fields});
			console.log('response', response);
			setIsLoggedIn(true);
		} catch (err) {
			// send form to server
			// handle errors
			console.log('err', err);
		}
	}
	if (isLoggedIn) {
		return <Redirect to='/' />;
	}
	return (
		<div id='id01' className=''>
			<div className='modal-content animate' action='/action_page.php'>
				<div className='imgcontainer'>
					<span>&times;</span>
					<img src='img_avatar2.png' alt='Avatar' className='avatar' />
				</div>

				<div className='container'>
					<label for='uname'>
						<b>Username</b>
					</label>
					<input
						type='text'
						placeholder='Enter Username'
						name='email'
						onChange={handleChange}
						required
					/>

					<label for='psw'>
						<b>Password</b>
					</label>
					<input
						type='password'
						placeholder='Enter Password'
						name='password'
						onChange={handleChange}
						required
					/>

					<button type='submit' onClick={onClick}>
						Login
					</button>
					<label>
						<input type='checkbox' checked='checked' name='remember' /> Remember me
					</label>
				</div>

				<div className='container'>
					<button type='button' className='cancelbtn'>
						Cancel
					</button>
					<span className='psw'>
						Forgot <a href='#'>password?</a>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Login;
