/* use strict */;
const puppeteer = require('puppeteer')

function getData(url, json) {
  return url ? url : json;
}

class GeneratePDF {
  constructor(url, json, template) {
    this.data = getData(url, json)
  }


  createPDF() {
    switch(typeof this.data) {
      case 'string':
        (async() => {
          const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
          console.log(await browser.version());
          const page = await browser.newPage();
          await page.goto(`this.data`);
          await page.pdf({path: '/tmp/google.pdf'});
          // await browser.close();
        })();

        break;
      case 'object':
        debugger
        break;
      default:
        debugger
    }


  }
}

module.exports = GeneratePDF
