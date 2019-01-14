'use strict'
const puppeteer = require('puppeteer');
const path = require('path');
const Graph = require('./presenter/graph');

class BrowserAPI {

  async setup() {
    console.log('setting up browser');
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    this.browser = browser;
    this.page = page;
    return Promise.resolve(this)

  }

  tareDown() {
    this.browser.disconnect()
  }

  async saveAsPDF(pdfName='testing') {
    if (this.page) {
      await this.page.pdf({path: `./tmp/${pdfName}.pdf`, format: 'Letter' });
      return pdfName
    }
  }


  async renderPage(template) {
    console.log('rendering page')

    try {
      if (/^(https?:\/\/)/.test(template)) {
        await this.page.goto(template);
      } else {
        await this.page.setContent(template)

        // Adds styles to page
        await this.page.emulateMedia('print');
        await this.page.addStyleTag({path: path.resolve(__dirname, './template/index.css')});


      }
    }

    catch(err) {
      return Promise.reject(err)
    }
  }
}

module.exports = BrowserAPI;
