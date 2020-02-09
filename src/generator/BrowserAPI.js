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

  async renderPDF() {
    if (this.page) {
      return await this.page.pdf({format: 'Letter' });
    }
  }

  async preview() {
    if (this.page) {
      return await this.page.screenshot({type: "jpeg", fullPage: true, encoding: "base64"})
    }
  }


  async renderPage(template, templateName) {
    console.log('rendering page')
      await this.page.setContent(template)
      await this.page.emulateMedia('print');
      try {
        await this.page.addStyleTag({path: path.resolve(__dirname, `./styles/${templateName}.css`)});
      } catch(e) {
        console.log('error: '+ e)
      }

      return {
        preview: await this.preview(),
        pdf:  await this.renderPDF()
      }
  }
}

module.exports = BrowserAPI;
