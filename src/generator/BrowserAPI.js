'use strict'
const puppeteer = require('puppeteer');
const path = require('path');

class BrowserAPI {
  constructor() {
    this.setup.call(this)
  }

  async setup() {
    console.log('setting up browser');
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    this.browser = browser;
    this.page = page

  }

  tareDown({ pdfName = ''}) {
    this.browser.disconnect()
    return pdfName
  }

  chromePDF(template, name="testing") {
    console.log('chromePDF')
    const pdfName = name;

    try {
      return (async() => {
        if (/^(https?:\/\/)/.test(template)) {
          await this.page.goto(template);
        } else {
          debugger
          await this.page.setContent(template)
        }

        await this.page.emulateMedia('screen');
        await this.page.addStyleTag({path: path.resolve(__dirname, './template/index.css')});
        await this.page.pdf({path: `./tmp/${pdfName}.pdf`, format: 'Letter' });
        return pdfName
      })();
    }
    catch(err) {
      console.log(err)
      return
    }
  }
}

module.exports = BrowserAPI;
