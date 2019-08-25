import React, {useState} from 'react';

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
	function onClick() {
		// send form to server
      c`onsole.log(fields);`
      window.location.replace('/login')
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
