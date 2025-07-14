"use server";

import { db } from "@/server/utils/db";
import { CreateLinkSchema } from "../schemas";
import { nanoid } from "nanoid";
import { auth } from "@/auth";

export type State = {
  message?: string | null;
  success?: boolean;
  errors?: {
    url?: string[];
    shortUrl?: string[];
  };
  fields?: {
    url?: string;
    shortUrl?: string;
    description?: string;
  };
};

export async function createPublicLink(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateLinkSchema.safeParse({
    url: formData.get("url"),
    shortUrl: formData.get("shortUrl") ?? nanoid(6),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      success: false,
      message: "There were errors",
      errors: {
        url: fieldErrors.url,
        shortUrl: fieldErrors.shortUrl,
      },
    };
  }

  const { url, shortUrl } = validatedFields.data;

  try {
    const link = await db.link.create({
      data: {
        url,
        shortUrl,
        userId: null,
      },
    });

    return {
      success: true,
      message: "Link created successfully!",
      fields: {
        shortUrl: link.shortUrl,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      message: "There were errors",
      errors: {
        shortUrl: ["This link already exists or is not valid."],
      },
    };
  }
}

export async function createLink(
  prevState: State,
  formData: FormData
): Promise<State> {
  const session = await auth();

  if (!session?.user) {
    return {
      message: "Unauthorized. Please log in.",
      success: false,
    };
  }

  const validatedFields = CreateLinkSchema.safeParse({
    url: formData.get("url"),
    shortUrl: formData.get("shortUrl"),
    description: formData.get("description") || undefined,
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      errors: {
        url: errors.url,
        shortUrl: errors.shortUrl,
      },
      fields: {
        url: formData.get("url") as string,
        shortUrl: formData.get("shortUrl") as string,
        description: formData.get("description") as string,
      },
      success: false,
    };
  }

  const { url, shortUrl, description } = validatedFields.data;

  try {
    await db.link.create({
      data: {
        url,
        shortUrl,
        description,
        userId: session.user.id,
      },
    });

    return {
      message: "Link created successfully!",
      success: true,
    };
  } catch (err) {
    console.error(err);

    return {
      message: "An error occurred. Try again later.",
      success: false,
    };
  }
}
