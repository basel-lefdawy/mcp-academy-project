import * as z from "zod";

export const deleteNoteInputSchema = z
  .object({
    noteId: z
      .string({ message: "Note ID must be a string." })
      .trim()
      .min(1, { message: "Note ID is required." })
      .max(100, { message: "Note ID must be 100 characters or fewer." })
      .describe("Identifier of the note to delete."),
  })
  .strict()
  .describe("Input required to delete an existing note.");