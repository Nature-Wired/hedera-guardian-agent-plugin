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

const plugin = {
  name: 'guardian-sustainability',
  version: '0.1.0',
  tools: [
    searchGuardianProjectsTool,
    getGuardianProjectTool,
  ],
};

export default plugin;
