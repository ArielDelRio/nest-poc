import { TWILIO } from 'src/common/constants';
import twilioConfig from 'src/config/twilio.config';
import { Policy } from 'twilio/lib/jwt/taskrouter/TaskRouterCapability';

// Helper function to create Policy
export function buildWorkspacePolicy(options?: {
  resources?: any;
  method?: any;
}) {
  options = options || {};
  const resources = options.resources || [];
  const workspaceSid = twilioConfig().workspaceSid;
  const urlComponents = [
    TWILIO.TASKROUTER_BASE_URL,
    TWILIO.VERSION,
    'Workspaces',
    workspaceSid,
  ];

  return new Policy({
    url: urlComponents.concat(resources).join('/'),
    method: options.method || 'GET',
    allow: true,
  });
}
