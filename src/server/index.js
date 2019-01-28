const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3380;
const message = 'PDF Generator app is running....'
const PDFGenerator = require('../generator')
const fs = require('fs');
const config = require('../../config.json')
const mustacheExpress = require('mustache-express')

// check if tmp directory exists
const dir = './tmp';
// To Use Mustache templating
app.engine('html.mustache', mustacheExpress());
app.set('view engine', 'html.mustache');
app.set('views', __dirname +  '/..' + '/generator/template/')

console.log('verify tmp/ exists')
if (! fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

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
  res.sendFile(path.resolve(__dirname + '/views/index.html'));
});

const publicPath = path.resolve(__dirname, 'dist/')
app.use('/demo_html', express.static(publicPath))
app.get('/demo_html', (req, res) => {
  res.render('index', config)
});

app.get('/patient_data', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/stubCSVData.csv'));
});

app.post('/generate_pdf', (req, res) => {
  const {url, json, template} = req.body

  new PDFGenerator(url, json, template)
    .createPDF().then((fileName) => {
    const pathLocation = `./tmp/${fileName}.pdf`;
    return res.sendFile(path.resolve(pathLocation))
  }).then(pathLocation => {
    console.log(`PDf saved to: ${pathLocation}` )
  });
});

app.listen(port, () => console.log(message));


