const fs = require('fs');
const path = require('path');

const readableStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf8');

readableStream.on('error', function (error) {
    console.log(`error: ${error.message}`);
})

readableStream.on('data', (chunk) => {
    console.log(chunk);
})
