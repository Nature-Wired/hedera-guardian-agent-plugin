import { z } from 'zod';
import { BaseTool } from '@hashgraph/hedera-agent-kit';

const parameters = z.object({
  projectId: z
    .string()
    .min(1)
    .describe('Guardian project identifier used to retrieve project details'),
});

export class GetGuardianProjectTool extends BaseTool {
  method = 'get_guardian_project';
  name = 'Get Guardian Project';
  description =
    'Retrieves detailed information for a selected Guardian sustainability project.';
  parameters = parameters;

  async coreAction(params: z.infer<typeof parameters>) {
    return {
      raw: {
        projectId: params.projectId,
        project: null,
      },
      humanMessage: `Guardian project detail lookup is not connected yet. Project requested: ${params.projectId}`,
    };
  }

  shouldSecondaryAction() {
    return false;
  }
}

export default GetGuardianProjectTool;
