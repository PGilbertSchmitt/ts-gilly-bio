import { parseMarkdown } from './src/index';
import fs from 'fs';

const md = fs.readFileSync('./rubric.md').toString();
const nodes = parseMarkdown(md);
const output = JSON.stringify(nodes);

fs.writeFileSync('./output.json', output);
