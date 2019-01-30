const {expect} = require('chai');
const sinon = require('sinon')
const PDFGenerator = require('../app')

let pdfGen;

describe('Generate PDF API', () => {
  beforeEach(() => pdfGen = new PdfGen())

  it('should return true', () =>
    expect(pdfGen).to.be.an.instanceof(PdfGen)
  );

  context('When generator is passed a url', () => {
    before(() => {
      pdfGen = new PdfGen({ url: 'www.google.com', data: {fakedata: 'fake'} })
    });
    beforeEach(() => {
      buildPDFSpy = sinon.spy(pdfGen, 'buildPDF')
    });
  })

  it('should call headless-chromium', () => {
    pdfGen.buildPDF();
    return expect(buildPDFSpy).to.be.called
  })

})
