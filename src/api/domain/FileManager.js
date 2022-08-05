const FileFactory = require("../service/factories/FileFactory.js");
const GDriveService = require("../service/GDriveService.js");

const gDriveService = new GDriveService();
class FileManager {
  constructor() {

  }
  async getFileGDrive(id, credentials, typeFile) {
    const auth = gDriveService.authenticateCredentials(credentials);
    const fileName = this.generateFileName(typeFile);

    return gDriveService.downloadFile(id, auth, fileName);
  }

  async getSearchResult(regularExpression, id, credentials, typeFile) {
    try {
      const path = await this.getFileGDrive(id, credentials, typeFile);
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

  generateFileName(typeFile) {
    let name = Math.floor(Math.random() * 1000);
    return name + "." + typeFile;
  }
}

module.exports = FileManager;
