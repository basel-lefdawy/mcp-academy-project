import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listNotesInputSchema } from "../schemas/listNotes.js";

export function registerListNotesTool(server: McpServer) {
  server.registerTool(
    "list_notes",
    {
      description: "List all stored notes or filter them by category.",
      inputSchema: listNotesInputSchema,
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
                tool: "list_notes",
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