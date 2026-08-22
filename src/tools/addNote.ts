import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addNoteInputSchema } from "../schemas/addNote.js";
import { addNote } from "../lib/notes.js";

export function registerAddNoteTool(server: McpServer) {
  server.registerTool(
    "add_note",
    {
      description: "Add a new note or FAQ entry.",
      inputSchema: addNoteInputSchema,
    },
    async (input) => {
      try {
        const validatedInput = addNoteInputSchema.parse(input);
        const note = await addNote({
          title: validatedInput.title,
          content: validatedInput.content,
          category: validatedInput.category,
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: true,
                  tool: "add_note",
                  note: {
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
          error instanceof Error ? error.message : "Unknown error while adding note.";

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: false,
                  tool: "add_note",
                  error: message,
                },
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