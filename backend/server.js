const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// refresh cookie
app.use((req, res, next) => {
	const user = req.cookies.user;
	if (user) {
		// set cookie
		res.cookie('user', user, {
			maxAge: 1000 * 60 * 5,
		});
   }
   next();
});

// get products
app.get('/products', (req, res) => {
	try {
		console.log('wor');
		const file = fs.readFileSync('products.json', 'utf8');
		const products = JSON.parse(file);
		res.json(products);
	} catch (err) {
		console.log('/products err', err.message);
	}
});

// register new user
app.post('/register', (req, res) => {
	try {
		const {email, password} = req.body;

		// read data from file;
		const fileData = fs.readFileSync('users.json', 'utf8');
		// parse json string to array of users
		const users = JSON.parse(fileData || '[]');
		// validate email is empty
		const existsUser = users.find(user => user.email === email);
		if (existsUser) {
			return res.status(500).json({
				err: 'user with same email exists',
			});
		}

		users.push({
			email,
			password,
		});

		// update file
		fs.writeFileSync('users.json', JSON.stringify(users), 'utf8');

		console.log('req', req.body);
		res.json({
			data: users,
		});
	} catch (err) {
		console.log('err', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// login

app.post('/login', (req, res) => {
	try {
      console.log('/login api')
		const {email, password} = req.body;

		// read data from file;
		const fileData = fs.readFileSync('users.json', 'utf8');
		// parse json string to array of users
		const users = JSON.parse(fileData || '[]');
		// validate email is empty
		const existsUser = users.find(user => user.email === email && user.password === password);
		if (!existsUser) {
			return res.status(500).json({
				err: 'invalid data for login',
			});
		}

		// set cookie
		res.cookie('user', JSON.stringify(existsUser), {
			maxAge: 1000 * 60 * 5,
		});

		console.log('existsUser', existsUser);
		res.json({
			data: users,
		});
	} catch (err) {
		console.log('/login err', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
