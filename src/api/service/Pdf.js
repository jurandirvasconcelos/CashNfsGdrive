const pdfParse = require("pdf-parse");
const File = require("./File.js");
const ImageManager = require("./ImageManager");
const imageManager = new ImageManager();

class Pdf extends File {
  path;
  constructor(path) {
    super();
    this.path = path;
  }

  async matchText(regularExpression) {
    const databuffer = this.read(this.path); //tentar não repetir o código
    const pdfInfo = await this.getMetadata(databuffer);
    const filteredValuesPdf = pdfInfo.text.match(regularExpression);
    return filteredValuesPdf[0];
  }

  async matchTextImage(regularExpression) {
    var nameImage = await imageManager.convertToImage(this.path);
    const textFromImage = await imageManager.getText("./" + nameImage);
    const filteredValuesImage = textFromImage.match(regularExpression);
    return filteredValuesImage[0];
  }

  async getMetadata(databuffer) {
    return pdfParse(databuffer);
  }

  async containsText() {
    const text = await this.getText();
    return (text !== "\n\n") ? true : false;
  }

  async getText() {
    const databuffer = this.read(this.path);
    const pdfInfo = await this.getMetadata(databuffer);
    return pdfInfo.info.text;
  }
}

module.exports = Pdf;
