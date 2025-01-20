const fs = require("fs");
const path = require("path");

const existingPath = path.join(__dirname, "assets");
const templatePath = path.join(__dirname, "template.html");
const stylesPath = path.join(__dirname, "styles");
const index = path.join(__dirname, "project-dist", "index.html");
const newStyles = path.join(__dirname, "project-dist", "style.css");
const newAssets = path.join(__dirname, "project-dist", "assets");

fs.readFile(templatePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    }
    fs.appendFile(index, data, err => {
        if (err) {
            console.error(err);
        }
    });
});

fs.readdir(stylesPath, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            const filePath = path.join(stylesPath, file.name);
            if (file.isFile() && path.extname(file.name) === '.css') {
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                    }
                    fs.appendFile(newStyles, data, err => {
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
                } else {
                    const first = path.join(current, file.name);
                    const second = path.join(newf, file.name);
                    copyDir(first, second)
                }
            })
        }
    });
}

copyDir(existingPath, newAssets)