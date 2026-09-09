import getGuardianProjectTool from './tools/getGuardianProject.js';

async function main() {
  const tool = getGuardianProjectTool({});

  const result = await tool.coreAction(
    {
      sourceTimestamp: '1785327655.183021104',
    },
    undefined,
    undefined,
  );

  console.log(
    JSON.stringify(
      {
        humanMessage: result.humanMessage,
        project: {
          name: result.raw.project?.name ?? null,
          sourceTimestamp: result.raw.project?.sourceTimestamp ?? null,
          registryName: result.raw.project?.registryName ?? null,
          developer: result.raw.project?.developer ?? null,
          methodology: result.raw.project?.methodology ?? null,
          category: result.raw.project?.category ?? null,
          sector: result.raw.project?.sector ?? null,
          status: result.raw.project?.status ?? null,
          lifecycleStage: result.raw.project?.lifecycleStage ?? null,
          sdgs: result.raw.project?.sdgs ?? [],
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