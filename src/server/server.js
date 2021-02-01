console.log('server side running');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = process.env.PORT || 8080;
const app = express();

//allow CORS
app.all(
    '*',function (req, res, next){
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Headers","X-Requested-With");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By",'3.2.1')
      res.header("Content-Type","application/json;charset=utf-8");
      next()
    }
)

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes')(app, fs);

// listen for requests
const server = app.listen(PORT, () => {
  console.log('listening on localhost:%s', server.address().port);
});