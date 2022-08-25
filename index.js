const App = require("./src/api/controller/App.js");
const credentials = require("./credentials/credentials.json");

var currencyBrazilian = (
    /(\(?\s?R\s?\$\s?\)?\s?\:?\s?)(\d{1,2}.)(\d{3})(,\d{2})?/g
);

var identifyAuthor = (/(\d{11})/gm)

var typeFile = "pdf";

var ids = [
    '1Cm7L6bSZma8JAnIoihyZP_qk23Q6AvMY',
    '1INoncYzxzlx_OpAJOQ84NslQ1tJ7AlNh',
    '1v_8SoelpMjMiD9mAErOswzcLg_LhWHf1',
    '1XymhfXtQNzAcMjSvArjZKdxYJeI9iAcy',
];

ids.forEach(async (id) => {
    try {
        const searchValue = new App(
            currencyBrazilian,
            id,
            credentials,
            typeFile);

        const authorResearch = new App(
            identifyAuthor,
            id,
            credentials,
            typeFile);

        console.log(
            "Author  " + await authorResearch.requestGDriveSearch() +
            "  Value " + await searchValue.requestGDriveSearch()
        );
    } catch (error) {
        console.log(error.message)
    }
});

