const fs = require("fs");
const path = require("path");
const readline = require('node:readline');

const writeStream = fs.createWriteStream(path.join(__dirname, 'file.txt'));

const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.setPrompt(`Please enter some text...\n`);
rl.prompt();

rl.on('line', (text) => {
    text.includes('exit') ? rl.close() : writeStream.write(text + '\n')
});

rl.on('SIGCONT', () => {
    rl.close()
});

rl.on('close', () => {
    writeStream.end();
    console.log('Thank you!');
});