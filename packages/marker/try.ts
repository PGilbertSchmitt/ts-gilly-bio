import fs from 'fs';
import { parseMarkdown } from './src/index';

const md = fs.readFileSync('./mark_file2.md').toString();
console.log(JSON.stringify(parseMarkdown(md)));
