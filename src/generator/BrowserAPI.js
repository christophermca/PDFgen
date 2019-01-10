'use strict'
const puppeteer = require('puppeteer');

class BrowserAPI {
  async setup() {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    this.browser = browser;
    this.page = page

    return {page, browser}
  }

  tareDown({ pdfName = ''}) {
    this.browser.close()
    return pdfName
  }

  chromePDF(template, name="testing") {
    return this.setup().then(() => {
      const pdfName = name;

      try {
        return (async() => {

          if (/^(https?:\/\/)/.test(template)) {
            await this.page.goto(template);
          } else {
            await this.page.setContent(template)
          }

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
