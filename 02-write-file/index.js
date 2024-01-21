const fs = require('fs');
const path = require('path');
const readline = require('readline');

const writeStream = fs.createWriteStream(path.resolve(__dirname, 'file.txt'), 'utf8');

const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt(`Welcome to the write file task. Enter text that you want:\n`);
rl.prompt();
rl.on('line', (text) => {
    text.includes('exit') ? rl.close() : writeStream.write(text + '\n');
});

rl.on('SIGINT', () => {
    rl.close();
});

rl.on('close', () => {
    writeStream.end();
    console.log('That`s it!');
});