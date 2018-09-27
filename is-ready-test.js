const fs = require('fs');

function nodeReady(dirPath) {
	return new Promise((resolve, reject) => {
		fs.stat(dirPath, (err, stats) => {
			if(err) {
				reject(err);
			} else {
				resolve();
			}
		})
	})
}

module.exports = nodeReady;