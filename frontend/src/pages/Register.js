import React, {useState} from 'react';
import axios from 'axios';
import validator from 'validator';
function Register(props) {
	const [fields, setFields] = useState({});
	const [err, setErr] = useState('');
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
			// validate
			const validEmail = validator.isEmail(fields.email || '');
			if (!validEmail) {
				return setErr('not valid email');
			}
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
			<center><img src='https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-1/254000/09-512.png'
				 width={600}
				 height={600}
				 /></center>
			email: <input type='text' name='email' onChange={handleChange} />
			{err && <div style={{color: 'red', fontSize: '0.8em'}}>{err}</div>}
			password: <input type='text' name='password' onChange={handleChange} />
			<button onClick={onClick}>submit</button>
		</div>
	);
}

export default Register;
