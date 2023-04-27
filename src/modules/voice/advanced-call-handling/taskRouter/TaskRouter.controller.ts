import { TaskRouterService } from './TaskRouter.service';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('task-router')
export class TaskRouterController {
  constructor(private readonly taskRouterService: TaskRouterService) {}
  @Post()
  assignmentCallback() {
    return 'ok';
  }

  @Get('fallback')
  fallback() {
    return 'fallback';
  }

  @Post('create-task')
  async createTask() {
    return await this.taskRouterService.createTask();
  }
}
