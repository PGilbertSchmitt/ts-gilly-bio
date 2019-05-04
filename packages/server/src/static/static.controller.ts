import { Controller, Get, Render, Param } from '@nestjs/common';

@Controller('/')
export class StaticController {
  @Get([
    '',
    'blog',
    'projects',
    'projects/:slug',
  ])
  @Render('index')
  index() {
    return {};
  }

  @Get(':path')
  @Render('404')
  fourOFour(@Param('path') path: string) {
    return { path };
  }
}
