import * as z from "zod";

export const LinkSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  shortUrl: z.string(),
  description: z.string().optional(),
});

// export type Link = z.infer<typeof LinkSchema>;

export const CreateLinkSchema = z.object({
  url: z
    .string()
    .url("Please enter a valid URL.")
    .nonempty("The URL field cannot be empty.")
    .max(2048, "The URL cannot exceed 2048 characters.")
    .refine(
      (value) => value.startsWith("http://") || value.startsWith("https://"),
      "The URL must start with http:// or https://."
    ),
  shortUrl: z
    .string()
    .min(3, "Short URL must have at least 3 characters.")
    .max(8, "Short URL cannot exceed 8 characters.")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Short URL can only contain letters, numbers, hyphens, and underscores."
    )
    .nonempty("Short URL is required."),
  description: z
    .string()
    .max(100, "Description cannot exceed 100 characters.")
    .optional(),
});
