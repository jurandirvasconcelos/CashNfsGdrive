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

  async isImage() {
    const defectiveProducers = [
      "cairo 1.17.4 (https://cairographics.org)",
      "DynamicPDF v4.0.0 for .NET",
    ];

    //filter no lugar do for]

    for (var i = 0; i < defectiveProducers.length; i++) {
      if (defectiveProducers[i] === (await this.getProducer())) {
        return true;
      }
    }
    return false;
  }

  async getProducer() {
    const databuffer = this.read(this.path);
    const pdfInfo = await this.getMetadata(databuffer);
    return pdfInfo.info.Producer;
  }
}

module.exports = Pdf;
