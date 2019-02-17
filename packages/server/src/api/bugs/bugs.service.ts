import { Injectable } from '@nestjs/common';
import IBug from 'interfaces/bug';

@Injectable()
export class BugsService {
  bugs: IBug[] = [
    {
      name: 'Boggo',
      legs: 2,
      isCute: true,
    },
    {
      name: 'Ladybug',
      legs: 6,
      isCute: true,
    },
    {
      name: 'Shpider',
      legs: 8,
      isCute: false,
    },
  ];

  getAll(): IBug[] {
    return this.bugs;
  }

  getByName(name: string): IBug {
    return this.bugs.find(bug => bug.name === name);
  }
}
