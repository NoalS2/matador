import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'server/entities/project.entity';
import { UserProject } from 'server/entities/user_project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(UserProject)
    private userProjectRepository: Repository<UserProject>,
  ) {}

  async findAllForUser(userId: number): Promise<Project[]> {
    const userProjects = await this.userProjectRepository.find({
      where: { userId },
      relations: ['project'],
    });
    return userProjects.map((userProject) => userProject.project);
  }

  findProjectById(id: number) {
    return this.projectRepository.findOne(id, { relations: ['userProjects', 'userProjects.user'] });
  }

  findUserProjectById(projectId: number, userId: number): Promise<UserProject> {
    return this.userProjectRepository.findOne({
      where: { projectId, userId },
    });
  }

  createProject(project: Project): Promise<Project> {
    return this.projectRepository.save(project);
  }

  createUserProject(userProject: UserProject): Promise<UserProject> {
    return this.userProjectRepository.save(userProject);
  }

  removeProject(project: Project) {
    this.projectRepository.delete(project);
  }
}
