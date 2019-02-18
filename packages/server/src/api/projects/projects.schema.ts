import { Document, Schema } from 'mongoose';

import { IProject } from 'interfaces/project';

export interface IProjectModel extends IProject, Document {
  created_at: Date;
  updated_at: Date;
}

// The schema needs to be syncronized with the project interface at src/interfaces/project.ts
export const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  stack: { type: String },
  thumbnail_path: { type: String },
  header_image_path: { type: String },
  urls: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
  }],

  created_at: { type: Date },
  updated_at: { type: Date },
});

// Dates should only be set by this hook
ProjectSchema.pre<IProjectModel>('save', function (next) {
  if (!this.created_at) {
    this.created_at = new Date();
  }

  this.updated_at = new Date();
  next();
});
