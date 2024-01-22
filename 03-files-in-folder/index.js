const fs = require('fs');
const path = require('path');

const secret = path.resolve(__dirname, 'secret-folder');

fs.readdir(secret, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            if (file.isFile()) {
                const filePath = path.join(secret, file.name);
                const fileName = path.parse(filePath).name;
                const extName = path.parse(filePath).ext.slice(1);
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`${fileName} - ${extName} - ${stats.size}bytes`);
                    }
                });
            }
        })
    }
});