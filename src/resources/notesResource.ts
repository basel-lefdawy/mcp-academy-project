import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { readDataFile } from "../lib/file.js";

export function registerNotesResource(server: McpServer) {
  server.registerResource(
    "notes_resource",
    "notes://notes",
    {
      title: "Notes fixture",
      description: "Read-only JSON resource exposing the notes fixture.",
      mimeType: "application/json",
    },
    async () => {
      const contents = await readDataFile("notes.json");

      return {
        contents: [
          {
            uri: "notes://notes",
            mimeType: "application/json",
            text: contents,
          },
        ],
      };
    }
  );
}
