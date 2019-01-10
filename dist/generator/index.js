'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var config = require('../../config.json');
var browserAPI = require('./BrowserAPI.js');
var mustache = require('mustache');
var fs = require('fs');

function getData(url, json) {
  return url ? url : JSON.parse(json);
}

async function _generateTemplate(filePath, data) {
  try {
    var filename = require.resolve(filePath);
    var template = fs.readFileSync(filePath, 'utf8');
    var templateString = mustache.render(template, data);

    return templateString;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

var GeneratePDF = function () {
  function GeneratePDF(url, json, template) {
    _classCallCheck(this, GeneratePDF);

    this.data = getData(url, json);
    this.templateData = config['defaults'];
  }

  _createClass(GeneratePDF, [{
    key: 'createPDF',
    value: function createPDF() {
      debugger;
      switch (_typeof(this.data)) {
        case 'string':
          return browserAPI.chromePDF('' + this.data);
          break;
        case 'object':
          if (this.data) {
            return _generateTemplate(path.resolve(__dirname, './template/' + this.templateData.name + this.templateData.ext), this.data).then(function (templateString) {
              return browserAPI.chromePDF('' + templateString);
            });
            break;
          }
        default:
          throw new TypeError('invalid data given to `createPDF`');
      }
    }
  }]);

  return GeneratePDF;
}();

module.exports = GeneratePDF;