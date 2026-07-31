import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addNoteInputSchema } from "../schemas/index.js";

export function registerAddNoteTool(server: McpServer) {
  server.registerTool(
    "add_note",
    {
      description: "Add a new note or FAQ entry.",
      inputSchema: addNoteInputSchema,
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
                tool: "add_note",
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