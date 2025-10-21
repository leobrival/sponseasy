> Why do I have a folder named ".figma" in my project?
The ".figma" folder is created to store references to the Figma design files used in this project.

> What does the "design.json" file contain?
The "design.json" file contains:
- The URL of the Figma design file ("designUrl")
- The ID of the Figma file ("fileId")
- The project name ("projectName")
- The default node ID for design references ("nodeId")

> Should I commit the ".figma" folder?
Yes, the ".figma" folder should be committed to version control as it contains design references
that are useful for all team members working on the project.

> How to use Figma MCP integration?
Claude Code has Figma Desktop MCP integration that can:
- Generate UI code from Figma designs using node IDs
- Extract design tokens and variables
- Get screenshots of specific design nodes
- Access Code Connect mappings

Use the mcp__figma-desktop tools to interact with Figma designs directly from Claude Code.
