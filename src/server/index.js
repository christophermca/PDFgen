const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mustacheExpress = require('mustache-express')

const app = express();
const port = 5713;
const message = 'PDF Generator app is running....'
const endpointName = 'generate_pdf'

// To Use Mustache templating
app.engine('html.mustache', mustacheExpress());
app.set('view engine', 'html.mustache');
app.set('views', __dirname +  '/..' + '/generator/templates/')

// To read req body: needed for POST
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.raw());

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('UH OH!')
});


// REST API
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/views/index.html'));
});

const publicPath = path.resolve(__dirname, '../generator/templates');
app.use(express.static(publicPath));

app.post(`/${endpointName}`, (req, res) => {
  const json = JSON.parse(req.body['json-data'])
  res.render('index', json )
});

app.listen(port, () => console.log(message));


