import TaskRouterCapability from 'twilio/lib/jwt/taskrouter/TaskRouterCapability';
import { Injectable } from '@nestjs/common';
import TwilioConfig from 'src/config/twilio.config';
import { TwilioService } from 'src/modules/twilio/twilio.service';
import { twiml } from 'twilio';
import { WorkspaceContext } from 'twilio/lib/rest/taskrouter/v1/workspace';
import { Policy } from 'twilio/lib/jwt/taskrouter/TaskRouterCapability';

@Injectable()
export class TaskRouterService {
  private workspace: WorkspaceContext;
  private twilioConfig = TwilioConfig();
  constructor(private readonly twilioService: TwilioService) {
    this.workspace = this.twilioService.twilio.taskrouter.v1.workspaces(
      this.twilioConfig.workspaceSid,
    );
  }

  incomingCall() {
    const voiceResponse = new twiml.VoiceResponse();

    const gather = voiceResponse.gather({
      numDigits: 1,
      action: '/task-router/enqueue-call',
      method: 'POST',
      timeout: 5,
    });

    gather.say({ language: 'es-ES' }, 'Para Español oprime el uno.');
    gather.say({ language: 'en-US' }, 'For English, please hold or press two.');

    return voiceResponse.toString();
  }

  enqueueCall(digits) {
    const voiceResponse = new twiml.VoiceResponse();
    const enqueue = voiceResponse.enqueue({
      workflowSid: this.twilioConfig.workflowSid,
    });

    if (digits === '1') {
      enqueue.task({}, JSON.stringify({ selected_language: 'es' }));
    } else {
      enqueue.task({}, JSON.stringify({ selected_language: 'en' }));
    }

    return voiceResponse.toString();
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

    // --- should be automatically --- //
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

  agentsView(workerSid: string) {
    const workerCapability = new TaskRouterCapability({
      accountSid: this.twilioConfig.accountSid,
      authToken: this.twilioConfig.authToken,
      workspaceSid: this.twilioConfig.workspaceSid,
      channelId: 'TC3e88329f5e65f3998b8fe6bc0c7d10b7',
    });

    const activitiesPolicy = new Policy({
      url: `https://taskrouter.twilio.com/v1/Workspaces/${this.twilioConfig.workspaceSid}/Activities`,
      method: 'POST',
      allow: true,
    });

    const reservationsPolicy = new Policy({
      url: `https://taskrouter.twilio.com/v1/Workspaces/${this.twilioConfig.workspaceSid}/Tasks/**`,
      method: 'POST',
      allow: true,
    });

    workerCapability.addPolicy(activitiesPolicy);
    workerCapability.addPolicy(reservationsPolicy);

    const workerToken = workerCapability.toJwt();

    // worker_capability = WorkerCapabilityToken(
    //   account_sid,
    //   auth_token,
    //   workspace_sid,
    //   worker_sid,
    // );
    // worker_capability.allow_update_activities();
    // worker_capability.allow_update_reservations();
    // worker_token = worker_capability.to_jwt().decode('utf-8');
    // return render_template('agent.html', (worker_token = worker_token));

    return workerToken;
  }
}
