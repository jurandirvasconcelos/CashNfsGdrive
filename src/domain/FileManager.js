const FileFactory = require("./factories/FileFactory.js");

class FileManager {
  async getSearchResult(path, regularExpression) {
    try {
      const file = new FileFactory().create(path);

      if (await file.isImage()) {
        return file.matchTextImage(regularExpression);
      } else {
        return file.matchText(regularExpression);
      }
    } catch (error) {
      if (error.code == "ENOENT") {
        return "File path error";
      }
      if (error.code == "ERR_UNHANDLED_REJECTION") {
        return "The file is not a PDF";
      } else {
        return error;
      }
    }
  }
}

module.exports = { FileManager };
