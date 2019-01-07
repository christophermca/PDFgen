/* use strict */;
const puppeteer = require('puppeteer');
const path = require('path');
const config = require('../../config.json');
const mustache = require('mustache');

function getData(url, json) {
  return url ? url : JSON.parse(json);
}

function _generateTemplate(template, data) {
  mustache


}

function _initBrowser() {
  return (async() => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    return [page, browser]
  })();
}

function _chromePDF(template) {
   return _initBrowser().then(args => {
     const [ page, browser ] = args
     const pdfName = 'testing'

     try {
       return (async() => {
         await page.goto(template);
         page.emulateMedia('screen');
         await page.pdf({path: `./tmp/${pdfName}.pdf`, format: 'Letter' });
         return pdfName
       })();
     }
     catch(err) {
       console.log(err)
     }
     finally {
       browser.close()
     }
   });
}

class GeneratePDF {
  constructor(url, json, template) {
    this.data = getData(url, json)
    this.template = config['defaults']['genericTemplateName']
  }

  createPDF() {
    switch(typeof this.data) {
      case 'string':
        return _chromePDF(`${this.data}`)
        break;
      case 'object':
        if (this.data) {
          const template = _generateTemplate(this.template, this.data)
          return _chromePDF(`${template}`)
          break;
        }
      default:
        throw new TypeError('invalid data given to `createPDF`')
    }


  }
}

module.exports = GeneratePDF
