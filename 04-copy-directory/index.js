const fsPromises = require("fs/promises");
const path = require("path");

const existingPath = path.join(__dirname, "files");
const newPath = path.join(__dirname, "files-copy");

async function copyDir(existing, newf) {
    await fsPromises.rm(newf, { force: true, recursive: true }, (err) => {
        if (err) {
            console.log(err);
        }
    });
    await fsPromises.mkdir(newf, { recursive: true }, (err) => {
        if (err) {
            console.log(err);
        }
    });
    const files = await fsPromises.readdir(existing, { withFileTypes: true });
    for (const file of files) {
        if (file.isFile()) {
            await fsPromises.copyFile(
                path.join(existing, file.name),
                path.join(newf, file.name));
        } else if (file.isDirectory()) {
            await copyDir(path.join(existing, file.name), path.join(newf, file.name));
        }
    }
}

copyDir(existingPath, newPath);