import React, {useState} from 'react';

const arr = [1, 2, 4];

function Home(props) {
	console.log('props', props);
	const [count, setCount] = useState(0);

	function handleClick() {
      setCount(count + 1);
      // http request to server
		fetch('https://jsonplaceholder.typicode.com/todos/')
			.then(respose => {
				return respose.json(); //wait for data of http response
			})
			.then(data => {
            console.log('data',data)
         });

		console.log('first');
	}
	return (
		<div>
			count : {count}
			<button onClick={handleClick}>add</button>
		</div>
	);
}

export default Home;
