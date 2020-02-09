const {expect} = require('chai');
const sinon = require('sinon')
const BrowserAPI = require('../src/generator/BrowserAPI')
const PDFGenerator = require('../src/generator')


describe('Generate PDF API', () => {
  let pdfGen;
  beforeEach(() => pdfGen = new PDFGenerator(1234, 'default'))

  describe('PdfGenerator Instance', () => {
    describe('constructor', () => {
      it('should get template configuration information', () => {
        expect(pdfGen).to.be.an.instanceof(PDFGenerator);
        expect(pdfGen.id).to.be.equal(1234);
        expect(pdfGen.theme).to.be.equal('default');
      })

      it('should get template configuration information', () =>
        expect(Object.keys(pdfGen.templateData)).to.deep.equal(['name', 'ext']))
    });

    describe('createPDF', () => {
      beforeEach(() => {
      })

      describe('when no records are available', () => {
        it('should return a object with preview and pdf', () => {
          const output = pdfGen.createPDF()
          expect(Object.keys(output)).to.be.deep.equal(['pdf', 'preview'])
        });
        it('should return a message to the user', () => {
        });
      })
    });
  });
})
