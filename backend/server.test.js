const request = require('supertest');

const {app} = require('./server');
const {readFile} = require('./functions');

// fake data for tests
const data = {
	user: 'test user',
	products: [
		{
			Brand: 'test Apple',
			Model: 'test iPhone XS',
			Compatibility: 'Partner',
			Size: '5.8',
			'Operating System': 'iOS',
			quantity: 111,
			price: 1099,
			imageUrl: 'https://img.ksp.co.il/item/62394/m_4.jpg?noCash',
			id: 1,
			amount: 3,
		},
	],
};

describe('Test server routes', () => {
	test('get logs route', async () => {
		try {
			const response = await request(app).get('/getLogs');
			expect(response.statusCode).toBe(200);
		} catch (error) {
			throw error;
		}
	});
	test('products route', async () => {
		try {
			const response = await request(app).get('/products');
			expect(response.body.length).toBe(9);
		} catch (error) {
			throw error;
		}
	});

	test('write to logs', async () => {
		try {
			const beforeLength = readFile('logs').length;
			const response = await request(app)
				.post('/log')
				.send(data);

			const afterLength = readFile('logs').length;

			expect(afterLength).toBe(beforeLength + 1);
		} catch (error) {
			throw error;
		}
	});

	test('buy item', async () => {
		try {
			const data = {
				cart: [{id: 1, Model: 'iPhone XS'}],
				amount: {
					'iPhone XS': 1,
				},
			};
			let products = readFile('products');
			const currentProduct = products.find(p => p.id === data.cart[0].id);
			const response = await request(app)
				.post('/buy')
				.send(data);

			products = readFile('products');
			const AfterProduct = products.find(p => p.id === data.cart[0].id);

			expect(AfterProduct.quantity).toBe(currentProduct.quantity - 1);
		} catch (error) {
			throw error;
		}
	});

	test('login ', async () => {
		try {
			const data = {
				email: 'admin',
				password: 'admin',
			};
			const response = await request(app)
				.post('/login')
				.send(data);

			expect(response.status).toBe(200);
		} catch (error) {
			throw error;
		}
	});

	test('register new user', async () => {
		try {
			const data = {
				email: 'test user ' + Date.now(),
				password: 'test',
			};
			let beforeLength = readFile('users').length;
			const response = await request(app)
				.post('/register')
				.send(data);

			let afterLength = readFile('users').length;

			expect(afterLength).toBe(beforeLength + 1);
		} catch (error) {
			throw error;
		}
	});
});
