import * as z from "zod";

export const listNotesInputSchema = z.object({
  category: z
    .string({ message: "Category must be a string." })
    .trim()
    .min(1, { message: "Category cannot be empty if provided." })
    .max(50, { message: "Category must be 50 characters or fewer." })
    .optional()
    .describe("Optional category to filter the returned notes."),
});
