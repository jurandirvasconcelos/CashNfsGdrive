const App = require("./api/controller/App.js");
const credentials = require("./credentials.json");

var CurrencyBrazilian = (
    /(\(?\s?R\s?\$\s?\)?\s?\:?\s?)(\d{1,2}.)(\d{3})(,\d{2})?/g
)
var typeFile = "pdf"

var ids = [
    '1v_8SoelpMjMiD9mAErOswzcLg_LhWHf1',
    '1Cm7L6bSZma8JAnIoihyZP_qk23Q6AvMY',
    '1VeGu3ep3xqnmP6qOAVeoVklkDhG9nu1M',
    '1INoncYzxzlx_OpAJOQ84NslQ1tJ7AlNh',
]


ids.forEach(async (id) => {
    var app = new App(
        CurrencyBrazilian,
        id,
        credentials,
        typeFile);

    console.log(await app.requestGDriveSearch());
})
   
