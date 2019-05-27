import markdown from 'markdown-it';
import { promisify } from 'util';

const parser = markdown();

export const mdToHTML = promisify<string, string>((md, cb) => {
  const html = parser.render(md);
  cb(null, html);
});
