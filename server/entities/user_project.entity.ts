import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class UserProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  projectId: number;

  @Column()
  contextId: string;

  @ManyToOne(() => User, (user) => user.userProject)
  user: User;

  @ManyToOne(() => Project, (project) => project.userProjects)
  project: Project;
}
