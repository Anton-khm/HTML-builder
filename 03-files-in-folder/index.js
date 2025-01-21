const fs = require("fs");
const path = require("path");

const secretPath = path.join(__dirname, "secret-folder");

fs.readdir(secretPath, { withFileTypes: true }, (err, dirents) => {
    if (err) {
        console.log(err);
    } else {
        dirents.forEach(file => {
            if (file.isDirectory()) return;
            else {
                const filePath = path.join(secretPath, file.name);
                const fileName = path.parse(filePath).name;
                const extension = path.parse(filePath).ext.slice(1);
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`${fileName} - ${extension} - ${stats.size}bytes`);
                    }
                })
            }
        }
        )
    }
});
