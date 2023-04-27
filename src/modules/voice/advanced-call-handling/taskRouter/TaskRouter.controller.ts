import { TaskInstanceDto } from '../../dto/TaskInstance.dto';
import { TaskRouterService } from './TaskRouter.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('task-router')
export class TaskRouterController {
  constructor(private readonly taskRouterService: TaskRouterService) {}
  @Post()
  assignmentCallback(@Body() taskInstance) {
    console.log({ taskInstance });
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

  @Post('remove-task')
  async removeTask(@Body() { taskSid }: { taskSid: string }) {
    return await this.taskRouterService.removeTask(taskSid);
  }

  @Post('accept-reservation')
  async acceptReservation(
    @Body()
    { taskSid, reservationSid }: { taskSid: string; reservationSid: string },
  ) {
    return await this.taskRouterService.acceptReservation(
      taskSid,
      reservationSid,
    );
  }
  @Post('complete-reservation')
  async completeTask(
    @Body()
    { taskSid, reservationSid }: { taskSid: string; reservationSid: string },
  ) {
    return await this.taskRouterService.completeTask(taskSid, reservationSid);
  }
}
