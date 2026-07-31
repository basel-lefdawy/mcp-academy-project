import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerDeleteNoteTool(server: McpServer) {
  server.registerTool(
    "delete_note",
    {
      description: "Delete a note by its identifier.",
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: false,
                message: "Not implemented yet.",
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