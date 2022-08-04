const { google } = require("googleapis");
const fs = require("fs");

const credentials = require("./credentials.json");

const scopes = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

const drive = google.drive({ version: "v3", auth });

async function downloadFile(realFileId) {
  const fileId = realFileId;
  try {
    return drive.files
      .get({ fileId, alt: "media" }, { responseType: "stream" })
      .then((res) => {
        return new Promise((resolve, reject) => {
          const dest = fs.createWriteStream("bia.pdf");
          let progress = 0;

          res.data
            .on("error", (err) => {
              console.error("Error downloading file.");
              reject(err);
            })
            .on("data", (d) => {
              progress += d.length;
              if (process.stdout.isTTY) {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write(`Downloaded ${progress} bytes`);
              }
            })
            .on("end", () => {
              console.log(" Done downloading file.");
              resolve("bia.pdf");
            })
            .pipe(dest);
        });
      });
  } catch (err) {
    throw err;
  }
}

/*
// lista todas as pastas compartilhadas 20 últimos arquivos
(async function () {
  let res = await new Promise((resolve, reject) => {
    drive.files.list(
      {
        pageSize: 20,
        fields: "files(name, webViewLink)",
        orderBy: "createdTime desc",
      },
      function (err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      }
    );
  });

  let data = "Name,URL\n";

  res.data.files.map((entry) => {
    const { name, webViewLink } = entry;
    data += `${name},${webViewLink}\n`;
  });

  fs.writeFile("data.csv", data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
})();
*/

async function getInfo(databuffer) {
  return pdfParse(databuffer);
}

(async () => {
  const data = await downloadFile("1lMN6mRo-KCvs1OuRjjcW046g4Lqcva80");
  const pdf = await getInfo(data);
  console.log(pdf.data);
})();
