const exec = require('child_process').exec;

const ports = ['8080', '8000'];

ports.forEach( (port) => {
	exec(`node http-count.js -p ${port}`, (err, stdout, stderr) => {
		console.log('All servers ready');
		const delay = 1000 // ms
		const handler = function() { console.log('tick') }
		// will log 'tick' every second
		setInterval(handler, delay)
	});
})
