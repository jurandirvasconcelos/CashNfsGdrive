const fs = require("fs");

class File {
  read(path) {
    return fs.readFileSync(path);
  }

  write(path, data, callback) {
    return fs.writeFileSync(path, data, callback);
  }
  
}

module.exports = File;
