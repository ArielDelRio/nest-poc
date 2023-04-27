import { Injectable } from '@nestjs/common';
import TwilioConfig from 'src/config/twilio.config';
import { TwilioService } from 'src/modules/twilio/twilio.service';
import { WorkspaceContext } from 'twilio/lib/rest/taskrouter/v1/workspace';

@Injectable()
export class TaskRouterService {
  private workspace: WorkspaceContext;
  private twilioConfig = TwilioConfig();
  constructor(private readonly twilioService: TwilioService) {
    this.workspace = this.twilioService.twilio.taskrouter.v1.workspaces(
      this.twilioConfig.workspaceSid,
    );
  }

  async createTask() {
    const task = await this.workspace.tasks.create({
      workflowSid: this.twilioConfig.workflowSid,
      attributes: JSON.stringify({
        selected_language: 'en',
      }),
    });
    return task.attributes;
  }

  async removeTask(taskSid: string) {
    try {
      return await this.workspace.tasks(taskSid).remove();
    } catch (error) {
      console.log({ error });
    }
  }

  async acceptReservation(taskSid: string, reservationSid: string) {
    const reservation = await this.workspace
      .tasks(taskSid)
      .reservations(reservationSid)
      .update({
        reservationStatus: 'accepted',
      });

    // const worker = await this.workspace.workers(reservation.workerSid);
    // const busyActivity = await this.workspace.activities.list({
    //   friendlyName: 'Busy',
    //   limit: 1,
    // });

    // await worker.update({
    //   activitySid: busyActivity?.[0]?.sid,
    // });

    return reservation;
  }

  async completeTask(taskSid: string, reservationSid: string) {
    return 'ok';
  }
}
