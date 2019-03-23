import { Controller, Get, Render, Param } from '@nestjs/common';

/* I could not think of a cleaner way to get multiple endpoints to route to the same method */

@Controller('/')
export class StaticController {
  @Get()
  @Render('index')
  root() {
    return {};
  }

  @Get('blog')
  @Render('index')
  blog() {
    return {};
  }

  @Get('projects')
  @Render('index')
  projects() {
    return {};
  }

  @Get(':path')
  @Render('404')
  fourOFour(@Param('path') path: string) {
    return { path };
  }
}
