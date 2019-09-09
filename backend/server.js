const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {readFile, writeFile, log} = require('./functions');
const fs = require('fs');
var Ddos = require('ddos');
var ddos = new Ddos({burst: 10, limit: 500});
const cors = require('cors');
const app = express();
const port = 3001;

app.use(ddos.express);
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// on user buy
// get products
app.post('/buy', (req, res) => {
	try {
		const user = JSON.parse((req.cookies && req.cookies.user) || '{"user":"test" "prodcuts":[]}');
		const cart = req.body.cart || [];
		const amount = req.body.amount || {};
		const products = readFile('products');
		for (const cartProduct of cart) {
			const product = products.find(p => p.id === cartProduct.id);
			const totalAmount = amount[cartProduct.Model];
			cartProduct.amount = totalAmount;
			// validate quantity
			if (totalAmount > product.quantity) {
				throw new Error('sorry buy we dont have this amount yet');
			}
			// update products
			product.quantity -= totalAmount;
			product.totalOrder += totalAmount;
		}
		writeFile('products', products);
		log({user: user.email, products: cart});

		// update user
		res.json();
	} catch (err) {
		console.log('/buy err', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

// save log
// get products
app.post('/log', (req, res) => {
	try {
		console.log('/log', req.body);
		let file = fs.readFileSync('logs.json', 'utf8');
		file = file || '[]';
		const logs = JSON.parse(file);
		logs.push(req.body);
		fs.writeFileSync('logs.json', JSON.stringify(logs));
		res.json();
	} catch (err) {
		console.log('/products err', err.message);
	}
});

app.get('/getLogs', (req, res) => {
	try {
		console.log('/getLogs', req.body);
		let logs = readFile('logs');
		res.json(logs);
	} catch (err) {
		console.log('/getLogs err', err.message);
	}
});

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
		console.log('/login api');
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
			data: 'ok',
		});
	} catch (err) {
		console.log('/login err', err.message);
		res.status(500).json({
			err: err.message,
		});
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// for testings
module.exports = {
	app,
};
