import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { searchNotesInputSchema } from "../schemas/index.js";

export function registerSearchNotesTool(server: McpServer) {
  server.registerTool(
    "search_notes",
    {
      description: "Search notes and FAQs using a keyword or phrase.",
      inputSchema: searchNotesInputSchema,
    },
    async (input) => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                stub: true,
                tool: "search_notes",
                input,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}