/* use strict */;
function getData(url, json) {
  let pdfData;
  if (url) { pdfData = url }
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
}

module.exports = GeneratePDF
