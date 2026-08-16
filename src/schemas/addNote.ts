import * as z from "zod";

export const addNoteInputSchema = z.object({
  title: z
    .string({ message: "Title must be a string." })
    .trim()
    .min(1, { message: "Title is required." })
    .max(100, { message: "Title must be 100 characters or fewer." })
    .describe("Title of the note."),

  content: z
    .string({ message: "Content must be a string." })
    .trim()
    .min(1, { message: "Content is required." })
    .max(5000, { message: "Content must be 5000 characters or fewer." })
    .describe("Main content of the note or FAQ answer."),

  category: z
    .string({ message: "Category must be a string." })
    .trim()
    .min(1, { message: "Category cannot be empty." })
    .max(50, { message: "Category must be 50 characters or fewer." })
    .optional()
    .describe("Optional category used to organize the note, such as 'Operating Systems' or 'React'."),
});
