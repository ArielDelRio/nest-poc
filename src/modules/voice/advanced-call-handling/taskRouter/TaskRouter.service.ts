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
}
