import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Project } from 'server/entities/project.entity';
import { User } from 'server/entities/user.entity';
import { UserProject } from 'server/entities/user_project.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { UsersService } from 'server/providers/services/users.service';

class ProjectPostBody {
  title: string;
}

class NewUserPostBody {
  email: string;
}

@Controller()
export class ProjectsController {
  constructor(private projectService: ProjectsService, private userService: UsersService) {}

  @Get('/projects')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    const projects = await this.projectService.findAllForUser(jwtBody.userId);
    return { projects };
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

    let userProject = new UserProject();
    userProject.leader = true;
    userProject.projectId = project.id;
    userProject.userId = jwtBody.userId;
    userProject = await this.projectService.createUserProject(userProject);
    return { project };
  }

  @Post('/project/:id')
  public async addUser(@Param('id') id: string, @Body() { email }: NewUserPostBody) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found.', 404);
    }

    let userProject = new UserProject();
    userProject.leader = false;
    userProject.projectId = parseInt(id, 10);
    userProject.userId = user.id;
    userProject = await this.projectService.createUserProject(userProject);
    return { user };
  }

  @Delete('/projects/:id')
  public async destroy(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const project = await this.projectService.findProjectById(parseInt(id, 10));
    const userProject = await this.projectService.findUserProjectById(parseInt(id, 10), jwtBody.userId);
    if (!userProject.leader) {
      return;
    }
    this.projectService.removeProject(project);
    return { success: true };
  }
}
