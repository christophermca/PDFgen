'use strict';

const path = require('path');
const config = require('../../config.json');
const browserAPI = new (require('./BrowserAPI'))();
const mustache = require('mustache');
const fs = require('fs');
const Graph = require('./presenter/graph')

//TODO move data to dynamodb
function _getData(id) {
  let data = null
    if(id.length == 0) return;
    const filepath = path.resolve(__dirname, `../db/${id}.json`);
    if(fs.existsSync(filepath)) {
      const json = fs.readFileSync(filepath, 'utf8')
      return JSON.parse(json);
    } else{
      return ({
        "error":`Records not found, no records were found for patient ${id}`
      })
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

  } catch(err) {
    return Promise.reject(err)
  }
}

class GeneratePDF {
  constructor(id, theme) {
    this.id = id
    this.theme = theme
    this.templateData = config['defaults']
  }

  createPDF() {
    const data = _getData(this.id);
    console.log('creating PDF');
    return browserAPI.setup().then(() => {
      if (data.error) {
        return data
      }
        const templatePath = path.resolve(__dirname, `./templates/${this.templateData.name}${this.templateData.ext}`);
        return _generateTemplate(templatePath, data)
          .then(templateString => browserAPI.renderPage(`${templateString}`)).then(data => data);
    })
  }
}
module.exports = GeneratePDF
