const fsPromises = require('fs/promises');
const path = require('path');

const mainFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

async function copyDir(src, dest) {
    await fsPromises.rm(dest, { force: true, recursive: true }, (err) => {
        if (err) {
            console.log("Error:", err);
        }
    });
    await fsPromises.mkdir(dest, { recursive: true }, (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
    const files = await fsPromises.readdir(src, { withFileTypes: true });
    for (const file of files) {
        if (file.isFile()) {
            await fsPromises.copyFile(
                path.join(src, file.name),
                path.join(dest, file.name));
        } else if (file.isDirectory()) {
            await copyDir(path.join(src, file.name), path.join(dest, file.name));
        }
    }
}

copyDir(mainFolder, copyFolder);