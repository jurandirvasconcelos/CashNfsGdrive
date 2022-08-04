const { google } = require("googleapis");
const fs = require("fs");

const scopes = ["https://www.googleapis.com/auth/drive"];
class GDriveService {
  authenticateCredentials(credentials) {
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      scopes
    );
    return auth;
  }

  startGDrive(auth) {
    return google.drive({ version: "v3", auth });
  }

  createStream(nameStream) {
    return fs.createWriteStream(nameStream);
  }

  async recordStream(stream, localFileName) {
    return new Promise((resolve, reject) => {
      const dest = this.createStream(localFileName);

      stream
        .on("error", (err) => {
          reject(err);
        })
        .on("end", () => {
          resolve(localFileName);
        })
        .pipe(dest);
    });
  }

  async downloadFile(fileId, auth, localFileName) {
    const drive = this.startGDrive(auth);

    return drive.files
      .get({ fileId, alt: "media" }, { responseType: "stream" })
      .then((response) => {
        return this.recordStream(response.data, localFileName);
      });
  }
}

module.exports = GDriveService;
