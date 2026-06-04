# auth.md — Agent registration & contact for Ed Krystosik

This document tells AI agents how to interact with edkrystosik.com.

## Authentication posture
This site is **public**. All content and the discovery endpoints
(`/.well-known/*`, `/api/mcp`, `/api/a2a`) are **anonymous and read-only**. There
is no protected API and **no registration is required**. No API keys or OAuth
credentials are issued for this site.

The notes API (`/api/notes`) is read-only for GET; write methods (POST/PUT/DELETE)
require a private bearer token held by the site owner and are not available to
third parties.

## How an agent should identify itself
Send a descriptive `User-Agent` (your agent/product name and a contact URL). Be a
good citizen: respect `robots.txt` and the `Content-Signal` directives, and keep
request rates reasonable.

## Contact
- LinkedIn: https://www.linkedin.com/in/ed-krystosik/ (primary; DM to start a conversation)

## Capabilities
See the [Agent Skills index](/.well-known/agent-skills/index.json), the
[MCP server card](/.well-known/mcp/server-card.json) and the
[A2A agent card](/.well-known/agent-card.json).
