const fs = require('fs');
const chalk = require('chalk');
const log = console.log;


const run = () => {
    Promise.all([readme_exixts(), mudules_exists()])
    .then(() => {
        log(chalk.bgYellow.black('maybe'))
    })
    .catch((err) => {
        if(err.hasOwnProperty('code') && err.code === 'ENOENT') {
            log(chalk.bgRed('not ready'))
            console.error(err)
            process.exit(1)
        } else if (err) {
            log(chalk.bgRed('maybe'))
            console.error(err)
            process.exit(1)
        } else {
            log(chalk.bgRed('maybe'))
        }
    })
}

function readme_exixts () {
    return new Promise((resolve, reject) => {
        fs.stat(`${__dirname}/README.md`, false, (err, stats) => {
            if(err){
                reject(err);
            } else {
                resolve()
            }
        })
    })
}

function mudules_exists () {
    return new Promise((resolve, reject) => {
        fs.stat(`${__dirname}/node_modules`, false, (err, stats) => {
            if(err){
                reject(err);
            } else {
                resolve()
            }
        })
    })
}

/**
 * Run or export the function 
 */


/**
 * Run !
 */
run()


/**
 * Export the function for a future import
 * @type function
 */
module.exports = {
    run
}

