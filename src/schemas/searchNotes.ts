import * as z from "zod";

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
