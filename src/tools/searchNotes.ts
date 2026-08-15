import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { searchNotesInputSchema } from "../schemas/searchNotes.js";
import { searchNotes } from "../lib/notes.js";

export function registerSearchNotesTool(server: McpServer) {
  server.registerTool(
    "search_notes",
    {
      description: "Search notes and FAQs using a keyword or phrase.",
      inputSchema: searchNotesInputSchema,
    },
    async (input) => {
      const matches = await searchNotes(input.query, input.limit ?? 10);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                tool: "search_notes",
                query: input.query,
                count: matches.length,
                matches: matches.map((note) => ({
                  id: note.id,
                  title: note.title,
                  category: note.category,
                })),
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