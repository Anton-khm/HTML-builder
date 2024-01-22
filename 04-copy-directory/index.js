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
    await fsPromises.mkdir(dest, { recursive: true },
        (err) => {
            if (err) {
                console.log(err)
                return;
            }
        });
    const entries = await fsPromises.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isFile()) {
            await fsPromises.copyFile(
                path.join(src, entry.name),
                path.join(dest, entry.name));
        } else if (entry.isDirectory()) {
            await copyDir(path.join(src, entry.name), path.join(dest, entry.name));
        }
    }
}

copyDir(mainFolder, copyFolder);