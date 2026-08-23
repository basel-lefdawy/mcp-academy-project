import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getNoteInputSchema } from "../schemas/getNote.js";
import { getNote } from "../lib/notes.js";

export function registerGetNoteTool(server: McpServer) {
  server.registerTool(
    "get_note",
    {
      description: "Retrieve the full contents of a note by its identifier.",
      inputSchema: getNoteInputSchema,
    },
    async (input) => {
      try {
        const validatedInput = getNoteInputSchema.parse(input);
        const note = await getNote(validatedInput.noteId);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                { ok: true, tool: "get_note", note },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error while retrieving note.";

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                { ok: false, tool: "get_note", error: message },
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