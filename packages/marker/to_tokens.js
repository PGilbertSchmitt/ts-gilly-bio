const fs = require('fs');
const markdown = require('markdown-it');

const parser = markdown();

const md = fs.readFileSync('./mark_file2.md');
const envir = {};
const tokens = parser.parse(md.toString(), envir);

fs.writeFileSync('./token_file2.json', JSON.stringify(tokens));
fs.writeFileSync('./envir_file2.json', JSON.stringify(envir));