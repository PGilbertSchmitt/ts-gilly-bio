import { Controller, Get } from '@nestjs/common';
import { PageService } from 'page/page.service';

@Controller()
export class PageController {
  constructor(private readonly pageService: PageService) { }

  @Get()
  getHello(): string {
    return this.pageService.getHello();
  }
}
