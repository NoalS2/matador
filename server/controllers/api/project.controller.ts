import { Controller, Get } from '@nestjs/common';

@Controller()
export class ProjectsController {
  @Get('/projects')
  public index() {
    return { message: 'Hello, world' };
  }
}
