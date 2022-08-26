const FileFactory = require("../service/factories/FileFactory.js");
const GDriveService = require("../service/GDriveService.js");
const FilterService = require("../service/FilterService.js");

const gDriveService = new GDriveService();
const filterService = new FilterService();

class FileManager {
  constructor() {}

  async getFileGDrive(id, credentials, typeFile) {
    const auth = gDriveService.authenticateCredentials(credentials);
    const fileName = this.generateFileName(typeFile);

    return gDriveService.downloadFile(id, auth, fileName);
  }

  async getSearchResult(id, credentials, typeFile) {
    try {
      const path = await this.getFileGDrive(id, credentials, typeFile);
      const file = new FileFactory().create(path);

      if (file.validatePdf()) {
        return this.getFileMatch(file);
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

  async getFileMatch(file) {
    const searchableFile = await file.validateText();
    const currencyBrazilian = filterService.getBrazilianValue();
    const identifyAuthor = filterService.getAuthor();

    let author, value;

    if (searchableFile) {
      author = await file.matchText(identifyAuthor);
      value = await file.matchText(currencyBrazilian);

      return this.getResponseStructure(author, value);
    } else {
      author = await file.matchTextImage(identifyAuthor);
      value = await file.matchTextImage(currencyBrazilian);

      return this.getResponseStructure(author, value);
    }
  }

  getResponseStructure(author, value) {
    return {
      author: author,
      value: value,
    };
  }
}

module.exports = FileManager;
