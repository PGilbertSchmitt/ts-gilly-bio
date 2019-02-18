interface IProjectUrl {
  name: string;
  url: string;
}

export interface IProject {
  readonly title: string;
  readonly desc: string;
  readonly urls: IProjectUrl[];
  readonly slug: string;
  readonly stack: string;
  readonly thumbnail_path: string;
  readonly header_image_path: string;
}
