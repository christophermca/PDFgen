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
    return Promise((resolve, reject) => {
      puppeteer.launch()
      .then(browser => browser.newPage())
      .then(page => {
        page.goto(`${url}`, {waitUntl: 'networkidle2'})
          .then((pdf) => resolve(pdf));
      }).catch(err => {
        console.log(err)
        debugger
      })

    });
  }
}

module.exports = GeneratePDF
