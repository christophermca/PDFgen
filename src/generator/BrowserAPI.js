'use strict'
const puppeteer = require('puppeteer');

class BrowserAPI {
  setup() {
    return (async() => {
      const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
      const page = await browser.newPage();

      this.browser = browser;
      this.page = page

      return {page, browser}
    })();
  }

  tareDown({ pdfName = ''}) {
    this.browser.close()
    return pdfName
  }

  chromePDF(template, name="testing") {
    return this.setup().then(() => {
      const pdfName = name;
      debugger

      try {
        return (async() => {
          await this.page.setContent(template)
          //await this.page.goto(template);
          this.page.emulateMedia('screen');
          await this.page.pdf({path: `./tmp/${pdfName}.pdf`, format: 'Letter' });
          return { pdfName }
        })();
      }
      catch(err) {
        console.log(err)
        return
      }
    }).then(args => this.tareDown(args))
  }
}

module.exports = new BrowserAPI()
