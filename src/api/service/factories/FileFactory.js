const Pdf = require("../../../../../Amount_NFS-e/src/scripts/pdf");

class FileFactory {
  //tentar levantar as exceções para o split e para a extenção do arquivo

  getFileType(filePath) {
    return filePath.split(".").pop();
  }

  create(path) {
    if (this.getFileType(path) === "pdf") {
      return new Pdf(path);
    }
  }
}

module.exports = FileFactory;
