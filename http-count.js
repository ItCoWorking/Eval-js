const express = require('express');
const app = express();
const utils = require('./utils');
const mustacheExpress = require('mustache-express');

if (process.argv[2] !== '-p' || process.argv[3] === undefined) {
    throw new Error('Le port n\'a pas été définit');
    process.exit(1);
}

let tempCount = 1;

app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(
    express.static(__dirname + '/public'),
    express.urlencoded(), 
    express.json(), 
    tempCounter, 
    hardCounter
)

app.get('/', function (req, res) {
  utils.getCounters(filePath, tempCount, port)
         .then((data) => {
            res.render('index', {counters: data})
         })
         .catch((err) => {
            console.error(err)
         })
})

app.post('/form', function (req, res) {
    if (req.body.hasOwnProperty('current')) {
        resetTempCounter();
    }

    if (req.body.hasOwnProperty('alltime')) {
        resetHardCounter();
    }
  res.sendFile(__dirname + '/views/index.html');
  res.redirect('/');
})

app.get('/counter', function (req, res) {
    utils.getCounters(filePath, tempCount)
         .then((data) => {
            res.json(data)
         })
         .catch((err) => {
            console.error(err)
         })
})


/**
 * Temporary counter
 * It count how many requests the server respond
 *  
 * @param  {Request}   req  The request
 * @param  {Response}   res  The sesponse
 * @param  {Next} next The next middleware  
 * @return {[void]}
 */
function tempCounter(req, res, next) {
    if (!req.body.hasOwnProperty('current')){
        tempCount ++
    }  
    next();
}

/**
 * Reset the temp counter
 * @return {void} 
 */
function resetTempCounter() {
    tempCount = 0
}




/**
 * Hard counter
 * It count how many requests the server respond
 * and write it on a db.json file
 *  
 * @param  {Request}   req  The request
 * @param  {Response}   res  The sesponse
 * @param  {Next} next The next middleware  
 * @return {[void]}
 */
const filePath = 'database/db.json'

function hardCounter(req, res, next) {
    if (req.body.hasOwnProperty('alltime')){
      next();
      return;  
    }  
    utils.readFile(filePath)
    .then((data) => {
        //get the old value 
        if(data.hasOwnProperty(port)){
            //update the old value
            data[port] += 1
        } else {
            data[port] = 1
        }
        utils.writeFile(filePath, data)
             .catch((err) => {
                console.error(err);
             })
            
    }).catch((err) => {
        if (err.hasOwnProperty('code') && err.code === 'ENOENT') {
            let value = {};
            value[port] = 1;
            utils.writeFile(filePath, value)
                 .catch((err) => {
                    console.error(err);
                 })
        }
    })
    next()
}

function resetHardCounter() {
    value[process.argv[3]] = 1;
    utils.writeFile(filePath, value)
         .catch((err) => {
            console.error(err);
         })
}

app.get('*', (req, res) => {
    res.send('<a href="/">Accueil</a>')
})


const port = process.argv[3];

app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
})
