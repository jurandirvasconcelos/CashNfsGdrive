const App = require("./src/api/controller/App.js");
const credentials = require("./credentials/credentials.json");

var typeFile = "pdf";

var ids = [
  "1Cm7L6bSZma8JAnIoihyZP_qk23Q6AvMY",
  //"1INoncYzxzlx_OpAJOQ84NslQ1tJ7AlNh",
  //"1v_8SoelpMjMiD9mAErOswzcLg_LhWHf1",
  //"1XymhfXtQNzAcMjSvArjZKdxYJeI9iAcy",
];

ids.forEach(async (id) => {
  try {
    const machtPdf = new App(id, credentials, typeFile);

    const response = await machtPdf.requestGDriveSearch();

    console.log("author " + response.author + " value" + response.value);
  } catch (error) {
    console.log(error.message);
  }
});
