import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerUpdateNoteTool(server: McpServer) {
  server.registerTool(
    "update_note",
    {
      description: "Update an existing note.",
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