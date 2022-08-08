const FileManager = require("../domain/FileManager.js");

class App {
    dataInputs = []

    constructor(regularExpression, id, credentials, typeFile) {
        this.regularExpression = regularExpression;
        this.id = id;
        this.credentials = credentials;
        this.typeFile = typeFile;
    }

    fillDataList(dataInputs) {
        dataInputs.push(this.regularExpression);
        dataInputs.push(this.id);
        dataInputs.push(this.credentials);
        dataInputs.push(this.typeFile);
    }

    async requestGDriveSearch() {
        this.fillDataList(this.dataInputs);
        if (this.checkDataInput(this.dataInputs)) {
            const fileManager = new FileManager();
            return fileManager
                .getSearchResult(
                    this.dataInputs[0],
                    this.dataInputs[1],
                    this.dataInputs[2],
                    this.dataInputs[3],
                )
        }
    }

    checkDataInput(dataInput) {
        const auth = dataInput.map(data => {
            if (data !== null) return true
            else return false
        })

        return auth.reduce((input1, input2) => { return input1 & input2 })
    }

}

module.exports = App;