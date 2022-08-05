const FileManager = require("../domain/FileManager.js");

class App {
    constructor(id, credentials, regularExpression, typeFile) {
        this.id = id;
        this.credentials = credentials;
        this.regularExpression = regularExpression;
        this.typeFile = typeFile;
    }

    dataInputs = [
        this.id,
        this.credentials,
        this.regularExpression,
        this.typeFile
    ]


    checkDataInput(dataInput) {
        const auth = dataInput.map(data => {
            if (data !== null) return true
            else return false
        })

        return auth.reduce((input1, input2) => { return input1 & input2 })
    }

}

