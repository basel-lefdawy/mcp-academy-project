import * as z from "zod";

export const updateNoteInputSchema = z
  .object({
    noteId: z
      .string({ message: "Note ID must be a string." })
      .trim()
      .min(1, { message: "Note ID is required." })
      .max(100, { message: "Note ID must be 100 characters or fewer." })
      .describe("Identifier of the note to update."),

    title: z
      .string({ message: "Title must be a string." })
      .trim()
      .min(1, { message: "Title is required when updating the title." })
      .max(100, { message: "Title must be 100 characters or fewer." })
      .optional()
      .describe("Optional replacement title."),

    content: z
      .string({ message: "Content must be a string." })
      .trim()
      .min(1, { message: "Content is required when updating the content." })
      .max(5000, { message: "Content must be 5000 characters or fewer." })
      .optional()
      .describe("Optional replacement content."),

    category: z
      .string({ message: "Category must be a string." })
      .trim()
      .min(1, { message: "Category cannot be empty when updating the category." })
      .max(50, { message: "Category must be 50 characters or fewer." })
      .optional()
      .describe("Optional replacement category."),
  })
  .strict()
  .refine(
    ({ title, content, category }) =>
      title !== undefined || content !== undefined || category !== undefined,
    { message: "At least one of title, content, or category is required." }
  )
  .describe("Input required to update one or more fields on an existing note.");