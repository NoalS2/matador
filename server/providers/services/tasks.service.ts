import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'server/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findTaskById(id: number) {
    return this.taskRepository.findOne(id);
  }

  async findAllForProject(projectId: number): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      where: { projectId },
    });
    return tasks;
  }

  createTask(task: Task) {
    return this.taskRepository.save(task);
  }

  editTask(task: Task) {
    return this.taskRepository.save(task);
  }

  removeTask(task: Task) {
    this.taskRepository.delete(task);
  }
}
