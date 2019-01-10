'use strict';

const path = require('path');
const config = require('../../config.json');
const browserAPI = require('./BrowserAPI.js');
const mustache = require('mustache');
const fs = require('fs');

function getData(url, json) {
  return url ? url : JSON.parse(json);
}

async function _generateTemplate(filePath, data) {
  try {
      const filename = require.resolve(filePath);
      const template = fs.readFileSync(filePath, 'utf8');
      const templateString = mustache.render(template, data)

      return templateString
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

  createPDF() {
    switch(typeof this.data) {
      case 'string':
        return browserAPI.chromePDF(`${this.data}`)
        break;
      case 'object':
        if (this.data) {
          return _generateTemplate(path.resolve(__dirname, `./template/${this.templateData.name}${this.templateData.ext}`), this.data)
            .then(templateString => browserAPI.chromePDF(`${templateString}`))
          break;
            }
      default:
        throw new TypeError('invalid data given to `createPDF`')
    }


  }
}

module.exports = GeneratePDF
