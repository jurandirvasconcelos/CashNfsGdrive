const File = require("./File.js");
const tesseract = require("tesseract.js");
const pdf2img = require("pdf-img-convert");
const file = new File();

class ImageManager {
  async getText(pathFile) {
    let {
      data: { text },
    } = await tesseract.recognize(pathFile, "por");
    return text;
  }

  async convertToImage(path) {
    var config = { width: 1024, height: 768, page_numbers: [1] };
    var pdfArray = await pdf2img.convert(path, config);
    var nameImage = this.generateName();
    file.write(nameImage, pdfArray[0], (error) => {
      if (error) console.error("Error: " + error);
    });
    return nameImage;
  }

  generateName() {
    var name = Math.floor(Math.random() * 1000);
    return name + ".png";
  }
}

module.exports = ImageManager;
