import { Injectable } from '@nestjs/common';
import TwilioConfig from 'src/config/twilio.config';
import { TwilioService } from 'src/modules/twilio/twilio.service';
import { twiml, jwt } from 'twilio';
import { WorkspaceContext } from 'twilio/lib/rest/taskrouter/v1/workspace';
import { TWILIO } from 'src/common/constants';
import { buildWorkspacePolicy } from './helper';

@Injectable()
export class TaskRouterService {
  private workspace: WorkspaceContext;
  private twilioConfig = TwilioConfig();
  constructor(private readonly twilioService: TwilioService) {
    this.twilioService.twilio.taskrouter.v1.workspaces(
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

    gather.say(
      { language: 'es-ES', voice: 'alice' },
      'Para Español oprime el uno.',
    );
    gather.say(
      { language: 'en-US', voice: 'alice' },
      'For English, please hold or press two.',
    );

    return voiceResponse.toString();
  }

  enqueueCall(digits) {
    const voiceResponse = new twiml.VoiceResponse();
    const enqueue = voiceResponse.enqueue({
      workflowSid: this.twilioConfig.workflowSid,
    });

    if (digits === '1') {
      voiceResponse.say('Estamos transfiriendo tu llamada a un agente.');
      enqueue.task({}, JSON.stringify({ selected_language: 'es' }));
    } else {
      voiceResponse.say('Please wait while we connect you to an agent.');
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
    const capability = new jwt.taskrouter.TaskRouterCapability({
      accountSid: this.twilioConfig.accountSid,
      authToken: this.twilioConfig.authToken,
      workspaceSid: this.twilioConfig.workspaceSid,
      channelId: workerSid,
    });

    // Event Bridge Policies
    const eventBridgePolicies = jwt.taskrouter.util.defaultEventBridgePolicies(
      this.twilioConfig.accountSid,
      workerSid,
    );

    // Worker Policies
    const workerPolicies = jwt.taskrouter.util.defaultWorkerPolicies(
      TWILIO.VERSION,
      this.twilioConfig.workspaceSid,
      workerSid,
    );

    const workspacePolicies = [
      // Workspace fetch Policy
      buildWorkspacePolicy(),
      // Workspace subresources fetch Policy
      buildWorkspacePolicy({ resources: ['**'] }),
      // Workspace Activities Update Policy
      buildWorkspacePolicy({ resources: ['Activities'], method: 'POST' }),
      // Workspace Activities Worker Reserations Policy
      buildWorkspacePolicy({
        resources: ['Workers', workerSid, 'Reservations', '**'],
        method: 'POST',
      }),
    ];

    eventBridgePolicies
      .concat(workerPolicies)
      .concat(workspacePolicies)
      .forEach(function (policy) {
        capability.addPolicy(policy);
      });

    const token = capability.toJwt();

    return token;
  }
}
