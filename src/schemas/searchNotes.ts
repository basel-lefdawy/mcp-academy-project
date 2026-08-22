import * as z from "zod";

export const searchNotesInputSchema = z.object({
  query: z
    .string({ message: "Search query must be a string." })
    .trim()
    .min(1, { message: "Search query cannot be empty. Please enter a keyword or phrase." })
    .max(200, { message: "Search query must be 200 characters or fewer." })
    .describe("Keyword or phrase to search for across note titles, content, and FAQs."),

  limit: z
    .number({ message: "Limit must be a number." })
    .int({ message: "Limit must be a whole number." })
    .positive({ message: "Limit must be greater than 0." })
    .max(20, { message: "Limit must be 20 or fewer." })
    .optional()
    .describe("Maximum number of matching notes to return. Defaults to 10."),
});
