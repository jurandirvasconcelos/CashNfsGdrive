const { google } = require("googleapis");
const fs = require("fs");

const scopes = ["https://www.googleapis.com/auth/drive"];
class GDriveService {
  authenticateCredentials(credentials) {
    const auth = new google.auth.JWT(
      this.credentials.client_email,
      null,
      this.credentials.private_key,
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
}
