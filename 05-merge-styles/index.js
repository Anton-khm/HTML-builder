const fs = require("fs");
const path = require("path");

const existingPath = path.join(__dirname, "styles");
const newPath = path.join(__dirname, "project-dist", "bundle.css");

fs.rm(newPath, { force: true, recursive: true }, (err) => {
    if (err) {
        console.log(err);
    }
});

fs.readdir(existingPath, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            const filePath = path.join(existingPath, file.name);
            if (file.isFile() && path.extname(file.name) === '.css') {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                    }
                    fs.appendFile(newPath, data, err => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
        })
    }
}
)
