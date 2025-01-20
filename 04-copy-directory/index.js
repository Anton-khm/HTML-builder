const fs = require("fs");
const path = require("path");

const existingPath = path.join(__dirname, "files");
const newPath = path.join(__dirname, "files-copy");

function copyDir(current, newf) {
    fs.mkdir(newf, { recursive: true }, (err) => {
        if (err) throw err;
    });

    fs.readdir(current, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach(file => {
                if (file.isFile()) {
                    fs.copyFile(path.join(current, file.name), path.join(newf, file.name), (err) => {
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

}

copyDir(existingPath, newPath)