/* use strict */;
const puppeteer = require('puppeteer')

function getData(url, json) {
  let pdfData;
  if (url) { pdfData = { url } }
  if (json) {
    try {
      pdfData = JSON.parse(json)
    }
    catch(err) {
      console.log(err)
    }
  }

  return pdfData
}

class GeneratePDF {
  constructor(url, json, template) {
    this.data = getData(url, json)
  }

  createPDF() {
    if (this.data.url) {
        const browser = Promise.resolve(puppeteer.launch());
        const page = Promise.resolve(browser.newPage());
        Promise.resolve(page.setrequetInterception(true))

      page.on('request', interceptedRequest => {
        const data = this.data
        debugger
        interceptedRequest.continue(data)
      }).bind(this)


    }

    });
    return
  }
}

module.exports = GeneratePDF
