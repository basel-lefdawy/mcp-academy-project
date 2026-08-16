import * as z from "zod";

export const listNotesInputSchema = z.object({
  category: z
    .string()
    .min(1)
    .max(50)
    .optional()
    .describe("Optional category to filter the returned notes."),
});
