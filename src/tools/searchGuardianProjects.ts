import axios from 'axios';
import { z } from 'zod';
import {
  BaseQueryTool,
  untypedQueryOutputParser,
} from '@hashgraph/hedera-agent-kit';

export const SEARCH_GUARDIAN_PROJECTS_TOOL = 'search_guardian_projects';

const parameters = z.object({
  query: z
    .string()
    .min(1)
    .describe('Keyword or phrase used to search sustainability projects'),
  pageSize: z
    .number()
    .int()
    .min(1)
    .max(50)
    .optional()
    .default(10)
    .describe('Maximum number of matching projects to return'),
});

export class SearchGuardianProjectsTool extends BaseQueryTool {
  method = SEARCH_GUARDIAN_PROJECTS_TOOL;
  outputParser = untypedQueryOutputParser;
  name = 'Search Sustainability Projects';
  description =
    'Searches Sustainability Atlas project data and returns matching Guardian sustainability projects.';
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
      `${atlasApiUrl}/mainnet/projects`,
      {
        timeout: 25000,
        headers: {
          'x-api-key': atlasApiKey,
        },
        params: {
          search: params.query,
        },
      },
    );

    const items = Array.isArray(response.data?.data)
      ? response.data.data
      : [];

    const projects = items.slice(0, params.pageSize).map((project: any) => ({
      sourceTimestamp: project.sourceTimestamp ?? null,
      name: project.name ?? null,
      country: project.country ?? null,
      registryName: project.registryName ?? null,
      developer: project.developer ?? null,
      methodology: project.methodology ?? null,
      category: project.category ?? null,
      sector: project.sector ?? null,
      status: project.status ?? null,
      lifecycleStage: project.lifecycleStage ?? null,
      sdgs: project.sdgs ?? [],
    }));

    return {
      raw: {
        query: params.query,
        count: projects.length,
        projects,
      },
      humanMessage:
        projects.length > 0
          ? `Found ${projects.length} Sustainability Atlas project result(s) for "${params.query}".`
          : `No Sustainability Atlas project results found for "${params.query}".`,
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

const searchGuardianProjectsTool = (_context: unknown) =>
  new SearchGuardianProjectsTool();

export default searchGuardianProjectsTool;