import searchGuardianProjectsTool from './tools/searchGuardianProjects.js';

async function main() {
  const tool = searchGuardianProjectsTool({});

  const result = await tool.coreAction(
    {
      query: 'reforestation',
      pageSize: 5,
    },
    undefined,
    undefined,
  );

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});