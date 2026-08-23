import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { updateNoteInputSchema } from "../schemas/updateNote.js";
import { updateNote } from "../lib/notes.js";

export function registerUpdateNoteTool(server: McpServer) {
  server.registerTool(
    "update_note",
    {
      description: "Update an existing note.",
      inputSchema: updateNoteInputSchema,
    },
    async (input) => {
      try {
        const validatedInput = updateNoteInputSchema.parse(input);
        const note = await updateNote(validatedInput);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  tool: "update_note",
                  updated: {
                    id: note.id,
                    title: note.title,
                    category: note.category,
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error while updating note.";

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                { ok: false, tool: "update_note", error: message },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }
    }
  );
}