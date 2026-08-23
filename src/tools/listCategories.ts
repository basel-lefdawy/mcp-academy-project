import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listCategoriesInputSchema } from "../schemas/listCategories.js";
import { listCategories } from "../lib/notes.js";

export function registerListCategoriesTool(server: McpServer) {
  server.registerTool(
    "list_categories",
    {
      description:
        "List only the available note category names. Use this when the user asks what categories exist. Do not use this to list notes or retrieve note content.",
      inputSchema: listCategoriesInputSchema,
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