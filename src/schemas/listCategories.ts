import * as z from "zod";

export const listCategoriesInputSchema = z
  .object({})
  .strict()
  .refine((data) => Object.keys(data).length === 0, {
    message: "This tool does not accept any arguments.",
  })
  .describe("No input arguments are required for listing categories.");
