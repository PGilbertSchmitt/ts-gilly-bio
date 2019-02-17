import { Controller, Get, Param } from '@nestjs/common';
import { BugsService } from 'api/bugs/bugs.service';
import IBug from 'interfaces/bug';

@Controller('/api/bugs')
export class BugsController {
  constructor(private readonly bugsService: BugsService) { }

  @Get()
  getBugs(): IBug[] {
    return this.bugsService.getAll();
  }

  @Get(':name')
  getBugByName(@Param('name') name): IBug {
    return this.bugsService.getByName(name);
  }

  // @Get('legs_:legs')
}
