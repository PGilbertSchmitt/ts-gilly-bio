import { APIProject } from '@gilly/common/dist/interfaces/projects';
import * as markdown from './project_markdown';

export const projects: APIProject[] = [
  {
    title: 'Gogol',
    desc: 'Configurable Game of Life',
    header_image_path: 'g7mG1kGN',
    slug: 'gogol',
    thumbnail_path: 'MNQO9VSK',
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux'],
    urls: [
      {
        name: 'Github',
        url: 'https://www.github.com/PGilbertSchmitt/gogol',
      }, {
        name: 'Live',
        url: 'https://pgilbertschmitt.github.io/gogol/',
      },
    ],
    content: markdown.gogol,
  },
  {
    title: 'VSCode Org Mode',
    desc: 'Brings emacs org mode extension to Visual Studio Code',
    slug: 'vscode-org-mode',
    stack: ['TypeScript'],
    thumbnail_path: 'Uy0lyzDm',
    header_image_path: 'MNFGoNyB',
    urls: [
      {
        name: 'Github',
        url: 'https://www.github.com/vscode-org-mode/vscode-org-mode',
      },
      {
        name: 'Live',
        url: 'https://marketplace.visualstudio.com/items?itemName=tootone.org-mode',
      },
    ],
    content: markdown.orgmode,
  },
  {
    title: 'Markdown Rubric',
    desc: 'A rubric for all markdown components I\'ve supported in my marker library',
    slug: 'rubric',
    stack: ['TypeScript', 'Markdown'],
    thumbnail_path: '',
    header_image_path: '',
    urls: [],
    content: markdown.rubric,
  },
];
