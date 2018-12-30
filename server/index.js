const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3380;
const message = 'PDF Generator app is running....'
const PDFGenerator = require('../generator')
const mustacheExpress = require('mustache-express')

// To Use Mustache templating
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/../generator/template/')

// To read req body: needed for POST
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('UH OH!')
});

// REST API
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/generate_pdf', (req, res) => {
  const {url, json, template} = req.body
  const { data } = new PDFGenerator(url, json, template);

  res.render('index.html', data)

});

app.listen(port, () => console.log(message));


