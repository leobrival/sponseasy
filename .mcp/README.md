# MCP Configuration (Model Context Protocol)

This project uses multiple MCP servers to interact with external services via Claude Code:
- **PostHog** - Analytics and feature flags
- **Vercel** - Deployment management
- **Figma** - Design and UI components
- **Chrome DevTools** - Debugging and performance audits

## Required Configuration

The PostHog MCP server requires local configuration with your personal API key via environment variables.

### First Installation

1. **Configure the API key in `.env.local`**:
   ```bash
   POSTHOG_AUTH_HEADER="Bearer phx_YOUR_PERSONAL_API_KEY_HERE"
   ```

2. **The `.mcp.json` file uses environment variable expansion**:
   ```json
   {
     "mcpServers": {
       "posthog": {
         "env": {
           "POSTHOG_AUTH_HEADER": "${POSTHOG_AUTH_HEADER}"
         }
       }
     }
   }
   ```

   The `${POSTHOG_AUTH_HEADER}` syntax automatically loads the value from `.env.local`

3. **Get your API key** (see section below)

**Note**:
- **Claude Code supports environment variable expansion** with `${VAR_NAME}`
- The `.env.local` file is in `.gitignore` to protect your API key
- The `.mcp.json` file is also in `.gitignore`
- Templates `.env.local.example` and `.mcp.json.example` are versioned

## Getting your PostHog API Key

1. **Go to PostHog**: https://app.posthog.com/settings/user-api-keys
2. **Create a new key** by clicking on "Create personal API key"
3. **Use the "MCP Server" preset** which provides:
   - Read access to everything
   - Write access for feature flags and dashboards
4. **Copy the generated key** (starts with `phx_...`)

## Key Configuration

Open `.env.local` and configure the environment variable:

```bash
# PostHog MCP Server - Personal API Key (phx_...) - for Claude Code MCP server
# Get from: https://app.posthog.com/settings/user-api-keys
# Use "MCP Server" preset when creating the key
POSTHOG_AUTH_HEADER="Bearer phx_YOUR_REAL_KEY_HERE"
```

The `.env.local` and `.mcp/server.json` files are in `.gitignore` so your key will never be committed.

## Installation Verification

Once the key is configured, restart Claude Code. The PostHog MCP server should appear in the list of available servers.

You can test with a command like:
```
List all PostHog projects
```

## MCP Server Capabilities

### PostHog MCP

The PostHog MCP server exposes **27 tools** including:

**Dashboards**
- Create dashboards from templates
- List existing dashboards
- Update dashboards

**Analytics**
- Execute SQL queries
- Analyze user trends
- Create insights

**Feature Flags**
- Manage feature flags
- Create and modify flags

**Other**
- Create annotations
- Manage projects
- Error tracking

### Vercel MCP

The Vercel MCP server exposes tools for:

**Deployments**
- Manage Vercel projects
- View deployments
- Analyze deployment logs

**Documentation**
- Search Vercel documentation
- Get information about features

**Configuration**
- Automatic OAuth authentication
- Support for project-specific URLs

### Figma Desktop MCP

The Figma Desktop MCP server (local) exposes tools for:

**Design**
- Generate UI code from designs
- Extract design tokens and variables
- Get design screenshots
- Access Code Connect mappings

**Workflow**
- Selection-based: Select a frame/layer in Figma
- Link-based: Copy the URL of a Figma frame/layer

**Configuration**
- Requires Figma Desktop app running
- Requires Dev Mode enabled
- Localhost: `http://127.0.0.1:3845/mcp`

### Chrome DevTools MCP

The Chrome DevTools MCP server allows debugging and auditing web pages directly in Chrome.

**Debugging**
- Verify code changes in real-time
- Diagnose network and console errors
- Simulate user behaviors
- Debug styling live

**Performance**
- Automated performance audits
- Core Web Vitals measurements (LCP, FID, CLS)
- Loading time analysis
- Performance issue detection

**Configuration**
- No authentication required
- Works with local Chrome/Chromium
- Automatic installation via `npx chrome-devtools-mcp@latest`

**Quick test**
```
Check the LCP and Core Web Vitals of https://norru.fr
```

## Project Information

All MCP server metadata is centralized in `.mcp/server.json`:

**PostHog MCP**
- Server URL: `https://mcp.posthog.com/mcp`
- Project ID: `125563`
- Analytics ID: `phc_liCWNKPqruWyVouvhxbruzbbAZHyiAi5PiY4BL8S1zF`
- Auth: `${POSTHOG_AUTH_HEADER}` (from `.env.local`)

**Vercel MCP**
- Server URL: `https://mcp.vercel.com`
- Project ID: `prj_YzVTZheHNOwd0xHCbM67Mj7DP0H7`
- Org ID: `team_Jpc8bWDWL8LNE0gYOkL3E8aN`
- Auth: Automatic OAuth

**Figma Desktop MCP**
- Server URL: `http://127.0.0.1:3845/mcp` (local)
- File ID: `Q4IQVh11okFFBuF6UvNB6N`
- Design URL: [Norru Design](https://www.figma.com/design/Q4IQVh11okFFBuF6UvNB6N/Norru)
- Auth: None (local)

**Chrome DevTools MCP**
- Command: `npx chrome-devtools-mcp@latest`
- Type: Local debugging tool
- Auth: None

This file centralizes all MCP metadata, similar to `.vercel/project.json` and `.figma/design.json`. The **MCP runtime configuration** is in `.mcp.json`.

## CLI vs MCP: Best Practices

### Prefer CLIs over MCPs

**IMPORTANT**: CLI usage is **always preferred** over MCP servers when available, because:

**More optimized**
- CLIs are native tools optimized for their platform
- Faster response times
- Less network latency

**Less costly**
- MCPs consume additional tokens for communication
- Each MCP call generates token costs
- CLIs have no token overhead

**More reliable**
- CLIs don't depend on constant network connection
- Fewer points of failure
- Better error handling

### When to use MCPs?

MCP servers are useful in these specific cases:

1. **No CLI available** - The service doesn't offer a CLI
2. **MCP-exclusive features** - Some capabilities are only available via MCP
3. **Conversational integration** - Need for natural interaction with the service
4. **Rapid prototyping** - Testing and exploring features

### Project Configuration

| Service | CLI | MCP | Recommendation |
|---------|-----|-----|----------------|
| **Vercel** | `vercel` CLI | MCP available | **Prefer CLI** |
| **Figma** | No CLI | MCP Desktop | **Use MCP** |
| **PostHog** | No CLI | MCP available | **Use MCP** |
| **Chrome DevTools** | Native DevTools | MCP available | **Prefer Native DevTools** |
| **GitHub** | `gh` CLI | MCP available | **Prefer CLI** |

## Resources

### MCP Documentation
- [PostHog MCP Documentation](https://posthog.com/docs/model-context-protocol)
- [Vercel MCP Documentation](https://vercel.com/docs/mcp/vercel-mcp)
- [Figma MCP Documentation](https://help.figma.com/hc/en-us/articles/32132100833559)
- [Chrome DevTools MCP Documentation](https://developer.chrome.com/blog/chrome-devtools-mcp)
- [Claude Code MCP Documentation](https://docs.claude.com/en/docs/claude-code/mcp)

### Repositories
- [GitHub PostHog MCP](https://github.com/PostHog/mcp)
- [Model Context Protocol Spec](https://modelcontextprotocol.io)

## Troubleshooting

### MCP server won't start

1. Verify that the API key is properly configured
2. Check that the key starts with `Bearer phx_...`
3. Restart Claude Code
4. Check MCP logs in Claude Code

### Authentication error

1. Verify that the API key hasn't expired
2. Check that the "MCP Server" preset was used during creation
3. Recreate a new key if necessary

## Security

**Important**:
- Credentials are stored in `.env.local` (already in `.gitignore`)
- The `.mcp/server.json` file is also in `.gitignore`
- Never commit API keys to Git
- Never share your personal API key
- Revoke the key if compromised
- Use different keys for dev/staging/production if necessary

## File Structure

```
.mcp/
├── server.json              # Server metadata (gitignored) - similar to .vercel/project.json
└── README.md               # Documentation

.env.local                   # Environment variables (gitignored) - contains POSTHOG_AUTH_HEADER
.env.local.example          # Environment variables template
.mcp.json                   # Claude Code MCP configuration (gitignored) - reads ${POSTHOG_AUTH_HEADER}
.mcp.json.example           # MCP configuration template
```

### File Roles

| File | Type | Role | Versioned |
|------|------|------|-----------|
| `.mcp.json` | **MCP Config** | Claude Code configuration that **reads** the environment variable | (gitignored) |
| `.mcp.json.example` | Template | MCP configuration template | |
| `.mcp/server.json` | Metadata | Server information (URL, project name) - documentation only | (gitignored) |
| `.env.local` | Environment | **Contains** the PostHog API key | (gitignored) |
| `.env.local.example` | Template | Environment variables template | |
