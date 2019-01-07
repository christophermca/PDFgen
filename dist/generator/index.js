'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* use strict */;
var puppeteer = require('puppeteer');
var path = require('path');
var config = require('../../config.json');

function getData(url, json) {
  return url ? url : JSON.parse(json);
}

function _setup() {
  return async function () {
    var browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    var page = await browser.newPage();

    return [page, browser];
  }();
}

function _tareDown(_ref) {
  var _ref$pdfName = _ref.pdfName,
      pdfName = _ref$pdfName === undefined ? '' : _ref$pdfName,
      browser = _ref.browser;

  browser.close();
  return pdfName;
}

function _chromePDF(template) {
  return _setup().then(function (args) {
    var _args = _slicedToArray(args, 2),
        page = _args[0],
        browser = _args[1];

    var pdfName = 'testing';

    try {
      return async function () {
        await page.goto(template);
        page.emulateMedia('screen');
        await page.pdf({ path: './tmp/' + pdfName + '.pdf', format: 'Letter' });
        return { pdfName: pdfName, browser: browser };
      }();
    } catch (err) {
      console.log(err);
      return { browser: browser };
    }
  }).then(function (args) {
    return _tareDown(args);
  });
}

var GeneratePDF = function () {
  function GeneratePDF(url, json, template) {
    _classCallCheck(this, GeneratePDF);

    this.data = getData(url, json);
    this.template = config['defaults']['genericTemplateName'];
  }

  _createClass(GeneratePDF, [{
    key: 'createPDF',
    value: function createPDF() {
      switch (_typeof(this.data)) {
        case 'string':
          return _chromePDF('' + this.data);
          break;
        case 'object':
          if (this.data) {
            var template = _generateTemplate(this.template, this.data);
            return _chromePDF('' + template);
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