import fs from 'fs';
import markdownIt from 'markdown-it';

const md = fs.readFileSync('./rubric.md').toString();
const tokens = markdownIt().parse(md.toString(), {});
fs.writeFileSync('./lexed.json', JSON.stringify(tokens));
