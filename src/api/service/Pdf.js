const pdfParse = require("pdf-parse");
const File = require("./File.js");
const ImageManager = require("./ImageManager");
const imageManager = new ImageManager();
const isPDF = require("is-pdf-valid");

class Pdf extends File {
  path;
  constructor(path) {
    super();
    this.path = path;
  }

  async matchText(regularExpression) {
    const databuffer = this.read(this.path);
    const pdfInfo = await this.getMetadata(databuffer);
    let filteredValues = pdfInfo.text.match(regularExpression);
    return this.checkMatchResult(filteredValues);
  }

  async matchTextImage(regularExpression) {
    var nameImage = await imageManager.convertToImage(this.path);
    const textFromImage = await imageManager.getText("./" + nameImage);
    let filteredValues = textFromImage.match(regularExpression);
    return this.checkMatchResult(filteredValues);
  }

  checkMatchResult(matchResult) {
    try {
      if (matchResult === null) {
        throw new Error("Search result not found");
      } else {
        return matchResult[0];
      }
    } catch (error) {
      return error.message;
    }
  }

  async getMetadata(databuffer) {
    return pdfParse(databuffer);
  }

  async validateText() {
    const text = await this.getText();
    return text !== "\n\n" ? true : false;
  }

  async getText() {
    const databuffer = this.read(this.path);
    const pdfInfo = await this.getMetadata(databuffer);
    return pdfInfo.text;
  }

  validatePdf() {
    return isPDF(this.read(this.path)) ? true : false;
  }
}

module.exports = Pdf;
