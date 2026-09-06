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
    .describe('Keyword or phrase used to search Guardian sustainability projects'),
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
  name = 'Search Guardian Projects';
  description =
    'Searches Guardian sustainability project data and returns matching project information.';
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

    const response = await client.get('/search', {
      params: {
        search: params.query,
        pageIndex: 0,
        pageSize: params.pageSize,
      },
    });

    const items = Array.isArray(response.data)
      ? response.data
      : response.data?.items ?? [];

    const projects = items.slice(0, params.pageSize).map((item: any) => ({
      id: item.consensusTimestamp ?? item.uuid ?? null,
      schemaName: item.analytics?.schemaName ?? null,
      textSearch: item.analytics?.textSearch ?? null,
    }));

    return {
      raw: {
        query: params.query,
        count: projects.length,
        projects,
      },
      humanMessage:
        projects.length > 0
          ? `Found ${projects.length} Guardian project result(s) for "${params.query}".`
          : `No Guardian project results found for "${params.query}".`,
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