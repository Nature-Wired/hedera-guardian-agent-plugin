import axios from 'axios';
import { z } from 'zod';
import {
  BaseQueryTool,
  untypedQueryOutputParser,
} from '@hashgraph/hedera-agent-kit';

export const GET_GUARDIAN_PROJECT_TOOL = 'get_guardian_project';

const parameters = z.object({
  sourceTimestamp: z
    .string()
    .min(1)
    .describe('HCS consensus timestamp for the Guardian project'),
});

export class GetGuardianProjectTool extends BaseQueryTool {
  method = GET_GUARDIAN_PROJECT_TOOL;
  outputParser = untypedQueryOutputParser;
  name = 'Get Guardian Project';
  description =
    'Retrieves decoded sustainability project details from the Sustainability Atlas.';
  parameters = parameters;

  async normalizeParams(
    params: z.infer<typeof parameters>,
    _context: any,
    _client: any,
  ) {
    return params;
  }

  async coreAction(
    params: z.infer<typeof parameters>,
    _context?: unknown,
    _client?: unknown,
  ) {
    const atlasApiKey = process.env.ATLAS_API_KEY;
    const atlasApiUrl =
      process.env.ATLAS_API_URL ?? 'https://atlas.xeptagon.com/api/v1';

    if (!atlasApiKey) {
      throw new Error('ATLAS_API_KEY is not configured');
    }

    const response = await axios.get(
      `${atlasApiUrl}/mainnet/projects/${encodeURIComponent(
        params.sourceTimestamp,
      )}`,
      {
        timeout: 25000,
        headers: {
          'x-api-key': atlasApiKey,
        },
      },
    );

    const project = response.data ?? null;

    return {
      raw: {
        sourceTimestamp: params.sourceTimestamp,
        project,
      },
      humanMessage: project
        ? `Retrieved Sustainability Atlas project details for ${project.name ?? params.sourceTimestamp}.`
        : `No Sustainability Atlas project was found for ${params.sourceTimestamp}.`,
    };
  }

  async shouldSecondaryAction(
    _coreActionResult: any,
    _context: any,
  ): Promise<boolean> {
    return false;
  }

  async secondaryAction(
    result: any,
    _client: any,
    _context: any,
  ) {
    return result;
  }
}

const getGuardianProjectTool = (_context: unknown) =>
  new GetGuardianProjectTool();

export default getGuardianProjectTool;