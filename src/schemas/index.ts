import * as z from "zod";

/**
 * Search Notes
 */
export const searchNotesInputSchema = z.object({
  query: z
    .string()
    .min(1)
    .max(200)
    .describe("Keyword or phrase to search for across note titles, content, and FAQs."),

  limit: z
    .number()
    .int()
    .positive()
    .max(20)
    .optional()
    .describe("Maximum number of matching notes to return. Defaults to 10."),
});

/**
 * Add Note
 */
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

/**
 * List Notes
 */
export const listNotesInputSchema = z.object({
  category: z
    .string()
    .min(1)
    .max(50)
    .optional()
    .describe("Optional category to filter the returned notes."),
});
