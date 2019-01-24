'use strict';
/*
 * renders graphs for PDF generator
 * */
const exampleGraph = require('./exampleGraph');

const { JSDOM } = require('jsdom');

class Graph {
  constructor(template) {
    this.template = template;
    this.initialize()

  }
  initialize() {
    const jsdom = new JSDOM(this.template)
    const {document} = jsdom.window
    this.DOM = document

  }

  // TODO Fix timing ?, D3 not rendering
  render({d3: csv}) {
    return new Promise((resolve, reject) => {
      if(csv) {
        return exampleGraph(this.DOM, csv).then(graph => resolve(graph));
      }
      return Promise.resolve(undefined)
    })
  }
}

module.exports = Graph;
