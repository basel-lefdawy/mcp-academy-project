import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listCategories } from "../lib/notes.js";

export function registerListCategoriesTool(server: McpServer) {
  server.registerTool(
    "list_categories",
    {
      description: "List all available note categories.",
    },
    async () => {
      const categories = await listCategories(10);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                tool: "list_categories",
                count: categories.length,
                categories,
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