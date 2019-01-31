const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mustacheExpress = require('mustache-express');
const fs = require('fs');

const app = express();
const port = 5713;
const message = 'PDF Generator app is running....';
const endpointName = 'generate_pdf';
const stubData = require('./views/stubData.json')

// To Use Mustache templating
app.engine('html.mustache', mustacheExpress());
app.set('view engine', 'html.mustache');
app.set('views', path.resolve(__dirname, '/..'))

// To read req body: needed for POST
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.raw());

// REST API
app.get('/', (req, res) => {
  res.render(__dirname + '/views/index', {data: JSON.stringify(stubData)});
});

const publicPath = path.resolve(__dirname, '../generator/templates');
app.use(express.static(publicPath));

app.post(`/${endpointName}`, (req, res) => {
  const json = JSON.parse(req.body['json-data'])
  res.render(__dirname + '/../generator/templates/index', json )
});

app.listen(port, () => console.log(message));


