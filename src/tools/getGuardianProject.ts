import axios from 'axios';
import { z } from 'zod';
import {
  BaseTool,
  untypedQueryOutputParser,
} from '@hashgraph/hedera-agent-kit';

const parameters = z.object({
  projectId: z
    .string()
    .min(1)
    .describe('Guardian project identifier or consensus timestamp'),
});

export class GetGuardianProjectTool extends BaseTool {
  method = 'get_guardian_project';
  outputParser = untypedQueryOutputParser;
  name = 'Get Guardian Project';
  description =
    'Retrieves detailed information for a selected Guardian sustainability project.';
  parameters = parameters;

  async coreAction(params: z.infer<typeof parameters>) {
    const baseURL = process.env.GUARDIAN_API_URL;
    const token = process.env.GUARDIAN_API_TOKEN;

    if (!baseURL) {
      throw new Error('GUARDIAN_API_URL is not configured');
    }

    const client = axios.create({
      baseURL,
      timeout: 25000,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });

    const response = await client.get('/entities/vc-documents', {
      params: {
        consensusTimestamp: params.projectId,
        pageIndex: 0,
        pageSize: 1,
      },
    });

    const items = Array.isArray(response.data)
      ? response.data
      : response.data?.items ?? [];

    const project = items[0] ?? null;

    return {
      raw: {
        projectId: params.projectId,
        project,
      },
      humanMessage: project
        ? `Retrieved Guardian project details for ${params.projectId}.`
        : `No Guardian project was found for ${params.projectId}.`,
    };
  }

  shouldSecondaryAction() {
    return false;
  }
}

export default GetGuardianProjectTool;
