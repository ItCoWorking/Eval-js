const fs = require('fs');
const options = {
    encoding: 'utf8'
}

function readFile(filePath) {
    return new Promise((resolve, reject) => {
       fs.readFile(filePath, options, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data !== '' ? JSON.parse(data) : { total: 0 });
       })
    })
}

function writeFile(filePath, data) {
    return new Promise((resolve, reject) => {

        fs.writeFile(filePath, JSON.stringify(data), options, (err, data) => {
            if (err) {
                reject(err);
                return;
            } 
            resolve();
       })
    })
}

function getCounters(filePath, tempCounter, port) {
    return new Promise((resolve, reject) => {
        readFile(filePath)
        .then((data) => {
            resolve({
                tempCounter: tempCounter,
                hardCounter: data[port]
            })

        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports = {
    readFile,
    writeFile,
    getCounters
}
