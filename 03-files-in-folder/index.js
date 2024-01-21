const fs = require('fs');
const path = require('path');
const process = require('process');

const folder = path.resolve(__dirname, 'secret-folder');

fs.readdir((folder, files) => {
    files.forEach((file) => {
        if (file.isFile()) {
            const filePath = path.join(folder, file.name);
            const fileName = path.parse(filePath).name;
            const extName = path.parse(filePath).ext.slice(1);
            fs.stat((filePath, stats) => {
                console.log(`${fileName} - ${extName} - ${stats.size}bytes`);
            });
        }
    });
});