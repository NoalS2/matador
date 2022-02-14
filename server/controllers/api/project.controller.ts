import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Project } from 'server/entities/project.entity';
import { ProjectsService } from 'server/providers/services/projects.service';

class ProjectPostBody {
  title: string;
}

@Controller()
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get('/projects')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    const projects = await this.projectService.findAllForUser(jwtBody.userId);
    return projects;
  }

  @Get('/project/:id')
  public async projectIndex(@Param('id') id: string) {
    const project = await this.projectService.findProjectById(parseInt(id, 10));
    return project;
  }

  @Post('/projects')
  public async create(@JwtBody() jwtBody: JwtBodyDto, @Body() body: ProjectPostBody) {
    let project = new Project();
    project.title = body.title;
    project = await this.projectService.createProject(project);
    return { project };
  }

  @Delete('/projects/:id')
  public async destroy(@Param('id') id: string) {
    const project = await this.projectService.findProjectById(parseInt(id, 10));
    //TODO: Implenet which users can delete which projects
    this.projectService.removeProject(project);
    return { success: true };
  }
}
