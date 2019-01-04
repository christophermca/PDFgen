/* use strict */;
const puppeteer = require('puppeteer')
const path = require('path');

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
        return (async() => {
          const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
          console.log(await browser.version());
          const page = await browser.newPage();
          try {
            await page.goto(`${this.data}`);
            debugger
            return await page.pdf({path: 'testing.pdf', format: "Letter"});
          } catch(err) {
            console.log(err)
            process.exit()
          }
            await browser.close();
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
