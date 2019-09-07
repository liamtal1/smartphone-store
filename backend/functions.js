const fs = require('fs');

function readFile(file) {
	let content = fs.readFileSync(`${file}.json`, 'utf8');
	content = content || '[]';
	return JSON.parse(content);
}

function writeFile(file, data) {
	fs.writeFileSync(`${file}.json`, JSON.stringify(data));
}

function log(data) {
	const logs = readFile('logs');
	logs.push(data);
	writeFile('logs', logs);
}

module.exports = {
	readFile,
	writeFile,
	log,
};
