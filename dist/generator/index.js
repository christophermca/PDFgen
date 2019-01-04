'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* use strict */;
var puppeteer = require('puppeteer');

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
      switch (_typeof(this.data)) {
        case 'string':
          (async function () {
            var browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
            console.log((await browser.version()));
            var page = await browser.newPage();
            await page.goto('this.data');
            await page.pdf({ path: '/tmp/google.pdf' });
            // await browser.close();
          })();

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