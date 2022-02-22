import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Task } from 'server/entities/task.entity';
import { TasksService } from 'server/providers/services/tasks.service';

class TaskPostBody {
  title: string;
  description: string;
  timeEstimate: string;
  userId: number;
  projectId: number;
}

@Controller()
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/tasks/:id')
  public async index(@Param('id') id: string) {
    const tasks = await this.taskService.findAllForProject(parseInt(id, 10));
    return tasks;
  }

  @Post('/task')
  public async create(@JwtBody() jwtBody: JwtBodyDto, @Body() body: TaskPostBody) {
    let task = new Task();
    task.title = body.title;
    task.userId = body.userId;
    task.description = body.description;
    task.timeEstimate = body.timeEstimate;
    task.projectId = body.projectId;
    task.status = false;
    task = await this.taskService.createTask(task);
    return { task };
  }

  @Post('/tasks/:id')
  public async edit(@Param('id') id: string) {
    let task = await this.taskService.findTaskById(parseInt(id, 10));
    task.status = !task.status;
    task = await this.taskService.editTask(task);
    return { task };
  }

  @Delete('/task/:id')
  public async destroy(@Param('id') id: string) {
    const task = await this.taskService.findTaskById(parseInt(id, 10));
    this.taskService.removeTask(task);
    return { success: true };
  }
}
