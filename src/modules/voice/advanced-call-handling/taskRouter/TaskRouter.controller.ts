import { Response } from 'express';
import { TaskRouterService } from './TaskRouter.service';
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';

@Controller('task-router')
export class TaskRouterController {
  constructor(private readonly taskRouterService: TaskRouterService) {}

  @Get('incoming-call')
  incomingCall() {
    return this.taskRouterService.incomingCall();
  }

  @Post('enqueue-call')
  enqueueCall(@Body('Digits') digits: string) {
    return this.taskRouterService.enqueueCall(digits);
  }

  @Post()
  assignmentCallback(@Body() taskInstance, @Res() res: Response) {
    console.log({ taskInstance });
    const activitySid = 'WA9948413ed42e0eaff0b583cfea2a209e';

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(
      JSON.stringify({
        instruction: 'dequeue',
        post_work_activity_sid: activitySid,
      }),
    );
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

  @Post('event-callback')
  eventCallback(@Body() event: any) {
    console.log({ event });
  }

  @Get('agents')
  agentsView(@Query('workerSid') workerSid: string) {
    return this.taskRouterService.agentsView(workerSid);
  }
}
