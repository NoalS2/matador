import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from 'server/controllers/api/project.controller';
import { Project } from 'server/entities/project.entity';
import { UserProject } from 'server/entities/user_project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, UserProject])],
  controllers: [ProjectsController],
  providers: [],
  exports: [],
})
export class ProjectsModule {}
