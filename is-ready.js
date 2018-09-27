const fs = require('fs');
const chalk = require('chalk');

const log = console.log;
const dirPath = `${__dirname}/node_module`;

// 2.1
fs.stat(dirPath, (err, stats) => {
	if(err && err.hasOwnProperty('code') && err.code === 'ENOENT') {
		throw new Error(chalk.red('not ready'));
		process.exit(1);
	} else if(err) {
		log(chalk.yellow('maybe'));
		throw new Error(chalk.red(err));
	} else {
		log(chalk.yellow('maybe'));
	}
})

// 2.2
nodeReady(dirPath)
	.then( () => {
		log(chalk.yellow('maybe'));
	})
	.catch(err => {
		if(err && err.hasOwnProperty('code') && err.code === 'ENOENT') {
			log(chalk.red('not ready'));
			process.exit(1);
		} else {
			log(chalk.yellow('maybe'));
		}
	});

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