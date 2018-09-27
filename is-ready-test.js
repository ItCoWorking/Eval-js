const fs = require('fs');

function nodeReady(dirPath) {
	return new Promise((resolve, reject) => {
		fs.stat(dirPath, (err, stats) => {
			if(err && err.hasOwnProperty('code') && err.code === 'ENOENT') {
				reject(err);
			} else if(err) {
				reject(err);
			} else {
				resolve();
			}
		})
	})
}

module.exports = nodeReady;