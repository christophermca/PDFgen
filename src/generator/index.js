/* use strict */;
const puppeteer = require('puppeteer');
const path = require('path');
const config = require('../../config.json');

function getData(url, json) {
  return url ? url : JSON.parse(json);
}

function _setup() {
  return (async() => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    return [page, browser]
  })();
}

function _tareDown({ pdfName = '', browser }) {
     browser.close()
     return pdfName
}

function _chromePDF(template) {
   return _setup().then(args => {
     const [ page, browser ] = args
     const pdfName = 'testing'

     try {
       return (async() => {
         await page.goto(template);
         page.emulateMedia('screen');
         await page.pdf({path: `./tmp/${pdfName}.pdf`, format: 'Letter' });
         return { pdfName, browser }
       })();
     }
     catch(err) {
       console.log(err)
       return {browser}
     }
   }).then(args =>_tareDown(args))
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
