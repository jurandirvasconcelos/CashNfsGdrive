const FileFactory = require("../service/factories/FileFactory.js");
const GDriveService = require("../service/GDriveService.js");

const gDriveService = new GDriveService();
class FileManager {
  constructor() { }

  async getFileGDrive(id, credentials, typeFile) {
    const auth = gDriveService.authenticateCredentials(credentials);
    const fileName = this.generateFileName(typeFile);

    return gDriveService.downloadFile(id, auth, fileName);
  }

  async getSearchResult(regularExpression, id, credentials, typeFile) {
    try {
      const path = await this.getFileGDrive(id, credentials, typeFile);
      const file = new FileFactory().create(path);

      if (file.validatePdf()) {
        return this.getFileMatch(file, regularExpression);
      } else {
        throw new Error("corrupted file or not PDF");
      }
    } catch (error) {
      return error.message;
    }
  }

  generateFileName(typeFile) {
    let name = Math.floor(Math.random() * 1000);
    return name + "." + typeFile;
  }

  async getFileMatch(file, regularExpression) {
    const searchableFile = await file.validateText();

    if (searchableFile) {
      return file.matchText(regularExpression);
    } else {
      return file.matchTextImage(regularExpression);
    }
  }

}

module.exports = FileManager;
