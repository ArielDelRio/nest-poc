import { registerAs } from '@nestjs/config';

export type TwilioConfig = {
  accountSid: string;
  authToken: string;
  workspaceSid: string;
  workflowSid: string;
};

export default registerAs('twilio', () => ({
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  workspaceSid: process.env.TWILIO_WORKSPACE_SID,
  workflowSid: process.env.TWILIO_WORKFLOW_SID,
}));
