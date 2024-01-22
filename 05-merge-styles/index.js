const path = require('path');
const fsPromises = require('fs/promises');
const fs = require('fs');

const bundleName = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles() {
    await fsPromises.rm(bundleName, { force: true, recursive: true }, (err) => {
        if (err) {
            console.log("Error:", err);
        }
    });
    const files = await fsPromises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err) => {
        if (err) {
            console.log("Error:", err);
        }
    });
    const writeStream = fs.createWriteStream(bundleName, { encoding: 'utf-8' });
    for (const file of files) {
        if (file.isFile() && path.extname(file.name) === '.css') {
            const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
            readStream.pipe(writeStream);
        }
    }
}

mergeStyles();