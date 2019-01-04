'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* use strict */;
var puppeteer = require('puppeteer');
var path = require('path');

function getData(url, json) {
  return url ? url : json;
}

var GeneratePDF = function () {
  function GeneratePDF(url, json, template) {
    _classCallCheck(this, GeneratePDF);

    this.data = getData(url, json);
  }

  _createClass(GeneratePDF, [{
    key: 'createPDF',
    value: function createPDF() {
      var _this = this;

      switch (_typeof(this.data)) {
        case 'string':
          return async function () {
            var browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
            console.log((await browser.version()));
            var page = await browser.newPage();
            try {
              await page.goto('' + _this.data);
              debugger;
              return await page.pdf({ path: 'testing.pdf', format: "Letter" });
            } catch (err) {
              console.log(err);
              process.exit();
            }
            await browser.close();
          }();

          break;
        case 'object':
          debugger;
          break;
        default:
          debugger;
      }
    }
  }]);

  return GeneratePDF;
}();

module.exports = GeneratePDF;