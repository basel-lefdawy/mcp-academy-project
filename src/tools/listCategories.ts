import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerListCategoriesTool(server: McpServer) {
  server.registerTool(
    "list_categories",
    {
      description: "List all available note categories.",
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