import axios from 'axios';

// function write to logs.json on severs
export default async data => {
	try {
		await axios.post('http://localhost:3000/log', data);
	} catch (err) {
		console.log('write to log err', err.message);
	}
};
