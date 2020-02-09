const chai = require('chai');
const {expect} = chai;
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const BrowserAPI = require('../src/generator/BrowserAPI');
const PDFGenerator = require('../src/generator');
chai.use(chaiAsPromised);


describe('Generate PDF API', () => {
  let pdfGen;
  beforeEach(() => pdfGen = new PDFGenerator(1234, 'default'));

  describe('PdfGenerator Instance', () => {
    describe('constructor', () => {
      it('should get template configuration information', () => {
        expect(pdfGen).to.be.an.instanceof(PDFGenerator);
        expect(pdfGen.id).to.be.equal(1234);
        expect(pdfGen.theme).to.be.equal('default');
      })

      it('should get template configuration information', () =>
        expect(Object.keys(pdfGen.templateData)).to.deep.equal(['name', 'ext']));
    })

    describe('createPDF', () => {
      let output;

      beforeEach(() => {
        pdfGen.id = 'testData';
        pdfGen.theme = 'tester';
      });

      describe('when data is found', () => {
        it('should return a object with preview and pdf', () => {
          const output = pdfGen.createPDF();
          return expect(pdfGen.createPDF()).to.eventually.have.keys(['pdf', 'preview']);
        });
      });

      describe('when no data is found', () => {
        const pdfGen = new PDFGenerator(1234, 'dummy-theme');
        console.log({ pdfGen })
          return expect(pdfGen.createPDF()).to.eventually.be.have.keys('error');

      });

    });
  });
})
