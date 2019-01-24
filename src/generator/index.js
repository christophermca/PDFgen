'use strict';

const path = require('path');
const config = require('../../config.json');
const browserAPI = new (require('./BrowserAPI'))();
const mustache = require('mustache');
const fs = require('fs');
const Graph = require('./presenter/graph')

function getData(url, json) {
  if(url) {
    return url

  } else {
    const data = JSON.parse(json);
    if (data.d3) {
      const stubCSVData = fs.readFileSync(path.resolve(__dirname, '../server/stubCSVData.csv'), 'utf8');
      Object.assign(data, {d3: stubCSVData})
    }

    return data
  }
}

function _generateTemplate(filePath, data) {
  console.log('generating Template');
  try {
      const template = fs.readFileSync(filePath, 'utf8');

      const templateString = mustache.render(template, data);

      // generate Graphs
    if (data && data.d3) {
      const graph = new Graph(templateString);
      return graph.render(data).then(html => {
        return Promise.resolve(html)
      });
    }
    return Promise.resolve(templateString);

  }
  catch(err) {
    console.log(err)
    return Promise.reject(err)
  }

}

class GeneratePDF {
  constructor(url, json, template) {
    this.data = getData(url, json)
    this.templateData = config['defaults']
  }

  createPDF(pdfName="testing") {
    console.log('creating PDF');
    return browserAPI.setup().then(() => {
      switch(typeof this.data) {
        case 'string':
          return browserAPI.renderPage(`${this.data}`).then(() =>
            browserAPI.saveAsPDF(pdfName))
          break;
        case 'object':
          if (this.data) {
            return _generateTemplate(path.resolve(__dirname, `./template/${this.templateData.name}${this.templateData.ext}`), this.data)
              .then(templateString => browserAPI.renderPage(`${templateString}`))
              .then(() => browserAPI.saveAsPDF(pdfName))
          }
        default:
          throw new TypeError('invalid data given to `createPDF`')
      }
    })
  }
}

module.exports = GeneratePDF
