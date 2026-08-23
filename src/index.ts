import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { registerSearchNotesTool } from "./tools/searchNotes.js";
import { registerAddNoteTool } from "./tools/addNote.js";
import { registerListNotesTool } from "./tools/listNotes.js";
import { registerUpdateNoteTool } from "./tools/updateNote.js";
import { registerDeleteNoteTool } from "./tools/deleteNote.js";
import { registerListCategoriesTool } from "./tools/listCategories.js";
import { registerGetNoteTool } from "./tools/getNote.js";
import { registerNotesResource } from "./resources/notesResource.js";

export function createServer() {
    const server = new McpServer({
        name: "notes-faq-search-mcp",
        version: "0.2.0",
    });

    registerSearchNotesTool(server);
    registerAddNoteTool(server);
    registerListNotesTool(server);
    registerUpdateNoteTool(server);
    registerDeleteNoteTool(server);
    registerListCategoriesTool(server);
    registerGetNoteTool(server);
    registerNotesResource(server);

    return server;
}

const transport = new StdioServerTransport();
async function main() {
    const server = createServer();
    await server.connect(transport);
}
main().catch(console.error);
console.error("notes-faq-search-mcp MCP server running on stdio");