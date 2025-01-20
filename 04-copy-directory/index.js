const fs = require("fs");
const path = require("path");

const existingPath = path.join(__dirname, "files");
const newPath = path.join(__dirname, "files-copy");

fs.mkdir(newPath, { recursive: true }, (err) => {
    if (err) throw err;
});

fs.readdir(existingPath, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            if (file.isFile()) {
                fs.copyFile(path.join(existingPath, file.name), path.join(newPath, file.name), (err) => {
                    if (err) {
                        console.log("Error:", err);
                    }
                    else {
                        console.log(`${file.name} copied`);
                    }
                })
            }
        })
    }
});
