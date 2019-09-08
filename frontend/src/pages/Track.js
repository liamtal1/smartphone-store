import React, {useEffect, useState} from 'react';
import '../stylesheets/track.css';
import axios from 'axios';

function Track() {
	let [logs, setLogs] = useState([]);
	const [filter, setFilter] = useState('');

	const handleChange = event => {
		setFilter(event.target.value);
	};
	useEffect(() => {
		async function fetchLogs() {
			try {
				const res = await axios.get('getLogs');
				console.log(res);
				setLogs(res.data);
			} catch (err) {
				console.log('fetchLogs err', err.message);
			}
		}
		fetchLogs();
	}, []);

	// filter items
	const filteredItems = logs.filter(log => {
		return log.user.includes(filter);
	});

	const viewLogs = filteredItems.map(({user, products = []}, i) => {
		return (
			<tr key={i}>
				<td>{user}</td>
				<td> buy ${products.length} items</td>
			</tr>
		);
	});

	return (
		<div className='main'>
			<div className='header'>
				<input type='text' onChange={handleChange} />
			</div>
			<table>
				<thead>
					<tr>
						<th>user</th>
						<th>order</th>
					</tr>
				</thead>
				<tbody>{viewLogs}</tbody>
			</table>
			
		</div>
	);
}
export default Track;
