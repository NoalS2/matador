import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Task } from 'server/entities/task.entity';
import { TasksService } from 'server/providers/services/tasks.service';

class TaskPostBody {
  description: string;
  timeEstimate: number;
}

@Controller()
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/task')
  public async create(@JwtBody() jwtBody: JwtBodyDto, @Body() body: TaskPostBody) {
    let task = new Task();
    task.description = body.description;
    task.timeEstimate = body.timeEstimate;
    task = await this.taskService.createTask(task);
    return { task };
  }

  @Delete('/task/:id')
  public async destroy(@Param('id') id: string) {
    const task = await this.taskService.findTaskById(parseInt(id, 10));
    this.taskService.removeTask(task);
    return { success: true };
  }
}
