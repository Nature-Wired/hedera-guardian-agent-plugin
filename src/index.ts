import type { Context, Plugin } from '@hashgraph/hedera-agent-kit';

import searchGuardianProjectsTool, {
  SEARCH_GUARDIAN_PROJECTS_TOOL,
} from './tools/searchGuardianProjects.js';

import getGuardianProjectTool, {
  GET_GUARDIAN_PROJECT_TOOL,
} from './tools/getGuardianProject.js';

export {
  SEARCH_GUARDIAN_PROJECTS_TOOL,
  GET_GUARDIAN_PROJECT_TOOL,
  searchGuardianProjectsTool,
  getGuardianProjectTool,
};

export const guardianSustainabilityPluginToolNames = {
  SEARCH_GUARDIAN_PROJECTS_TOOL,
  GET_GUARDIAN_PROJECT_TOOL,
};

export const guardianSustainabilityPlugin: Plugin = {
  name: 'guardian-sustainability',
  version: '0.1.0',
  tools: (context: Context) => [
    searchGuardianProjectsTool(context),
    getGuardianProjectTool(context),
  ],
};

export default guardianSustainabilityPlugin;