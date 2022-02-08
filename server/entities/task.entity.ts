import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  description: string;

  @Column()
  timeEstimate: number;

  @Column()
  status: boolean;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
