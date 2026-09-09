import searchGuardianProjectsTool from './tools/searchGuardianProjects.js';
import getGuardianProjectTool from './tools/getGuardianProject.js';

async function main() {
  const searchTool = searchGuardianProjectsTool({});
  const detailTool = getGuardianProjectTool({});

  const searchResult = await searchTool.coreAction(
    {
      query: 'mangrove',
      pageSize: 5,
    },
    undefined,
    undefined,
  );

  console.log('\nSEARCH RESULT');
  console.log(JSON.stringify(searchResult, null, 2));

  const firstProject = searchResult.raw.projects[0];

  if (!firstProject?.sourceTimestamp) {
    throw new Error('No sourceTimestamp returned from project search');
  }

  const detailResult = await detailTool.coreAction(
    {
      sourceTimestamp: firstProject.sourceTimestamp,
    },
    undefined,
    undefined,
  );

  console.log('\nPROJECT DETAIL');
  console.log(
    JSON.stringify(
      {
        humanMessage: detailResult.humanMessage,
        project: {
          name: detailResult.raw.project?.name ?? null,
          sourceTimestamp: detailResult.raw.project?.sourceTimestamp ?? null,
          country: detailResult.raw.project?.country ?? null,
          registryName: detailResult.raw.project?.registryName ?? null,
          developer: detailResult.raw.project?.developer ?? null,
          methodology: detailResult.raw.project?.methodology ?? null,
          category: detailResult.raw.project?.category ?? null,
          sector: detailResult.raw.project?.sector ?? null,
          status: detailResult.raw.project?.status ?? null,
          lifecycleStage: detailResult.raw.project?.lifecycleStage ?? null,
          sdgs: detailResult.raw.project?.sdgs ?? [],
        },
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});