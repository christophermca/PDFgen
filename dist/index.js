'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var port = 3380;
var message = 'PDF Generator app is running....';
var PDFGenerator = require('../generator/index.js');
var mustacheExpress = require('mustache-express');

var _require = require('../config.json'),
    _require$defaults = _require.defaults,
    template = _require$defaults.template,
    ext = _require$defaults.ext;

// To Use Mustache templating
app.engine(ext, mustacheExpress());
app.set('view engine', ext);
app.set('views', path.resolve(__dirname, '..', '/generator/template/', template, '.' + ext));

// To read req body: needed for POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Error Handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('UH OH!');
});

// REST API
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/generate_pdf', function (req, res) {
  var _req$body = req.body,
      url = _req$body.url,
      json = _req$body.json,
      template = _req$body.template;

  debugger;
  new PDFGenerator(url, json, template);
});

app.listen(port, function () {
  return console.log(message);
});
