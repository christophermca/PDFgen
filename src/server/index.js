const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3380;
const message = 'PDF Generator app is running....'
const PDFGenerator = require('../generator')
const mustacheExpress = require('mustache-express')
const {defaults: {template, ext}} = require('../../config.json')

// To Use Mustache templating
app.engine(ext, mustacheExpress());
app.set('view engine', ext);
app.set('views', path.resolve(__dirname, '..',
                              '/generator/template/',
                              template, `.${ext}`)
)

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
  const pdfGen = new PDFGenerator(url, json, template).createPDF().then(() => {
     res.type('application/pdf')
     res.sendFile(path.resolve(__dirname, '..', '/generator/tmp/temp.pdf'))
  });
});

app.listen(port, () => console.log(message));


