'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var port = 3380;
var message = 'PDF Generator app is running....';
var PDFGenerator = require('../generator');

var _require = require('../../config.json'),
    _require$defaults = _require.defaults,
    genericTemplateName = _require$defaults.genericTemplateName,
    ext = _require$defaults.ext;

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
  res.sendFile(path.resolve(__dirname + '/views/index.html'));
});

app.post('/generate_pdf', function (req, res) {
  var _req$body = req.body,
      url = _req$body.url,
      json = _req$body.json,
      template = _req$body.template;

  new PDFGenerator(url, json, template).createPDF().then(function (pdfName) {
    if (!pdfName) res.status(500);
    return res.sendFile(path.resolve('./tmp/' + pdfName + '.pdf'));
  });
});

app.listen(port, function () {
  return console.log(message);
});