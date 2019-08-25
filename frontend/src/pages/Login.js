import React from 'react';

function Login(props) {
	return (
		<div id='id01' className=''>
			<form className='modal-content animate' action='/action_page.php'>
				<div className='imgcontainer'>
					<span
					>
						&times;
					</span>
					<img src='img_avatar2.png' alt='Avatar' className='avatar' />
				</div>

				<div className='container'>
					<label for='uname'>
						<b>Username</b>
					</label>
					<input type='text' placeholder='Enter Username' name='uname' required />

					<label for='psw'>
						<b>Password</b>
					</label>
					<input type='password' placeholder='Enter Password' name='psw' required />

					<button type='submit'>Login</button>
					<label>
						<input type='checkbox' checked='checked' name='remember' /> Remember me
					</label>
				</div>

				<div className='container' >
					<button
						type='button'
						className='cancelbtn'
					>
						Cancel
					</button>
					<span className='psw'>
						Forgot <a href='#'>password?</a>
					</span>
				</div>
			</form>
		</div>
	);
}

export default Login;
