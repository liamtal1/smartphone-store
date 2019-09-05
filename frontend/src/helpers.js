import Cookie from 'js-cookie';

function getUser() {
	const user = JSON.parse(Cookie.get('user') || '{}');
	return user;
}

export {getUser};
