import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';
import { UserProject } from './user_project.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @OneToMany(() => UserProject, (userProject) => userProject.project, { cascade: true })
  userProjects: UserProject[];
}
