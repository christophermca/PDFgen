const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5713;
const message = 'PDF Generator app is running....'

//Move to AWS lambda
const PDFGenerator = require('../generator')

const {defaults: {genericTemplateName, ext}} = require('../../config.json')
const stubData = require('../db/stubData.json');

// check if tmp directory exists
const dir = './tmp';

console.log('verify tmp/ exists')
if (! fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Error Handling
app.use((err, req, res, next) => {
  res.status(500).send(err)
});

/**
 * {description} PDF generator API
 * {returns} JSON
 */
app.get('/generate_pdf', (req, res) => {
  const {id, theme} = req.query

  //sudo call db and get JSON data
  new PDFGenerator(id, theme)
    .createPDF().then((outputData) => {
      return res.json(outputData);
  })
});

app.listen(port, () => console.log(message));


