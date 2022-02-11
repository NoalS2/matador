import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from 'server/controllers/api/tasks.controller';
import { Task } from 'server/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [],
  exports: [],
})
export class TasksModule {}
