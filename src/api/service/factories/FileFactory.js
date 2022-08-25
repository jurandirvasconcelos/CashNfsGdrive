const Pdf = require("../Pdf.js");

class FileFactory {

  getFileType(filePath) {
    return filePath.split(".").pop();
  }

  create(path) {
    if (this.getFileType(path) === "pdf") {
      return new Pdf(path);
    } else {
      throw new Error("Type file is not supported");
    }
  }
}

module.exports = FileFactory;
