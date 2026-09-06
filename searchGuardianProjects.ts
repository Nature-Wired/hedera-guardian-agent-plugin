import { z } from 'zod';
import { BaseTool } from '@hashgraph/hedera-agent-kit';

const parameters = z.object({
  query: z.string().min(1).describe('Keyword or phrase used to search Guardian sustainability projects'),
});

export class SearchGuardianProjectsTool extends BaseTool {
  method = 'search_guardian_projects';
  name = 'Search Guardian Projects';
  description =
    'Searches Guardian sustainability project data and returns matching project information.';
  parameters = parameters;

  async coreAction(params: z.infer<typeof parameters>) {
    return {
      raw: {
        query: params.query,
        projects: [],
      },
      humanMessage: `Guardian project search is not connected yet. Search requested for: ${params.query}`,
    };
  }

  shouldSecondaryAction() {
    return false;
  }
}

export default SearchGuardianProjectsTool;
