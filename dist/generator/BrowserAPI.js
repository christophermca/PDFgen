'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var puppeteer = require('puppeteer');

var BrowserAPI = function () {
  function BrowserAPI() {
    _classCallCheck(this, BrowserAPI);
  }

  _createClass(BrowserAPI, [{
    key: 'setup',
    value: async function setup() {
      var browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
      var page = await browser.newPage();

      this.browser = browser;
      this.page = page;

      return { page: page, browser: browser };
    }
  }, {
    key: 'tareDown',
    value: function tareDown(_ref) {
      var _ref$pdfName = _ref.pdfName,
          pdfName = _ref$pdfName === undefined ? '' : _ref$pdfName;

      this.browser.close();
      return pdfName;
    }
  }, {
    key: 'chromePDF',
    value: function chromePDF(template) {
      var _this = this;

      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "testing";

      return this.setup().then(function () {
        var pdfName = name;
        debugger;

        try {
          return async function () {

            if (/^(https?:\/\/)/.test(template)) {
              await _this.page.goto(template);
            } else {
              await _this.page.setContent(template);
            }

            _this.page.emulateMedia('screen');
            await _this.page.pdf({ path: './tmp/' + pdfName + '.pdf', format: 'Letter' });
            return { pdfName: pdfName };
          }();
        } catch (err) {
          console.log(err);
          return;
        }
      }).then(function (args) {
        return _this.tareDown(args);
      });
    }
  }]);

  return BrowserAPI;
}();

module.exports = new BrowserAPI();