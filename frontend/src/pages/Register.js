import React, {useState} from 'react';
import axios from 'axios';

function Register(props) {
	const [fields, setFields] = useState({});
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
			const response = await axios.post('http://localhost:3001/register', {...fields});
			console.log('response', response);
			window.location.replace('/login');
		} catch (err) {
			// send form to server
			// handle errors
			console.log('err', err);
		}
	}
	return (
		<div>
			email: <input type='text' name='email' onChange={handleChange} />
			password: <input type='text' name='password' onChange={handleChange} />
			<button onClick={onClick}>submit</button>
		</div>
	);
}

export default Register;
