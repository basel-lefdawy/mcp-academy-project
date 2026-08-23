import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { deleteNoteInputSchema } from "../schemas/deleteNote.js";
import { deleteNote } from "../lib/notes.js";

export function registerDeleteNoteTool(server: McpServer) {
  server.registerTool(
    "delete_note",
    {
      description: "Delete a note by its identifier.",
      inputSchema: deleteNoteInputSchema,
    },
    async (input) => {
      try {
        const validatedInput = deleteNoteInputSchema.parse(input);
        const deleted = await deleteNote(validatedInput.noteId);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                { ok: true, tool: "delete_note", deleted },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error while deleting note.";

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                { ok: false, tool: "delete_note", error: message },
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