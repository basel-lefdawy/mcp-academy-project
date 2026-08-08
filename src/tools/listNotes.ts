import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listNotesInputSchema } from "../schemas/listNotes.js";
import { listNotes } from "../lib/notes.js";

export function registerListNotesTool(server: McpServer) {
  server.registerTool(
    "list_notes",
    {
      description: "List all stored notes or filter them by category.",
      inputSchema: listNotesInputSchema,
    },
    async (input) => {
      const notes = await listNotes(input.category);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                tool: "list_notes",
                category: input.category ?? null,
                count: notes.length,
                notes: notes.map((note) => ({
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