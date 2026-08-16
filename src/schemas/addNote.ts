import * as z from "zod";

export const addNoteInputSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(100)
    .describe("Title of the note."),

  content: z
    .string()
    .min(1)
    .max(5000)
    .describe("Main content of the note or FAQ answer."),

  category: z
    .string()
    .min(1)
    .max(50)
    .optional()
    .describe("Optional category used to organize the note, such as 'Operating Systems' or 'React'."),
});
