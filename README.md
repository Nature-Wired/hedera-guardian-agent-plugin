# Hedera Guardian Agent Plugin

A third-party Hedera Agent Kit plugin for sustainability project discovery and retrieval using the Sustainability Atlas APIs.

This plugin builds on the Nature Backers AI Agent work originally developed for the Hedera Agent AI bounty. The reusable contribution focuses on project discovery and retrieval rather than Nature Backers-specific campaign logic.

## What the plugin does

The plugin exposes two read-only tools for AI agents:

1. **Search sustainability projects**  
   Search Sustainability Atlas project data using keywords or criteria such as location, theme, SDG, methodology, or project status.

2. **Retrieve project details**  
   Retrieve richer decoded project information for a selected project using its HCS consensus timestamp (`sourceTimestamp`).

The underlying tool names are:

- `search_guardian_projects`
- `get_guardian_project`

## Installation

```bash
npm install @nature-wired/hedera-guardian-agent-plugin
```

## Search sustainability projects

The search tool returns structured project information including:

- project name
- HCS source timestamp
- country
- registry
- developer
- methodology
- category
- sector
- project status
- lifecycle stage
- SDGs

Example searches:

- `mangrove`
- `blue carbon`
- `reforestation`
- `SDG 14`
- `Brazil`

## Retrieve project details

The project detail tool uses the HCS `sourceTimestamp` returned by search to retrieve richer decoded project information from the Sustainability Atlas.

This avoids requiring the agent to interpret raw Guardian VC documents directly.

## Workflow

Typical agent flow:

1. Search Sustainability Atlas for relevant sustainability projects.
2. Review the structured project shortlist.
3. Select a project.
4. Use the returned `sourceTimestamp` to retrieve full decoded project details.
5. Present the project information for human review or use in a downstream workflow.

## Resources

Hedera Guardian:  
https://guardian.hedera.com/

Sustainability Atlas explorer:  
https://guardian.hedera.com/explorers/sustainability-atlas

Sustainability Atlas API documentation:  
https://atlas.xeptagon.com/api/docs