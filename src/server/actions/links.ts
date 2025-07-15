"use server";

import { db } from "@/server/utils/db";
import { LinkSchema, UpdateLinkSchema } from "../schemas";
import { nanoid } from "nanoid";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

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
  const validatedFields = LinkSchema.safeParse({
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

  const validatedFields = LinkSchema.safeParse({
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

    revalidatePath("/dashboard");

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

export async function editLink(
  prevState: State,
  formData: FormData
): Promise<State> {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      message: null,
      errors: { url: ["Unauthorized"] },
    };
  }

  const values = {
    id: formData.get("id")?.toString() ?? "",
    url: formData.get("url")?.toString() ?? "",
    shortUrl: formData.get("shortUrl")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
  };

  const validated = UpdateLinkSchema.safeParse(values);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      fields: values,
    };
  }

  const { id, url, shortUrl, description } = validated.data;

  const existingLink = await db.link.findUnique({
    where: { id },
  });

  if (!existingLink || existingLink.userId !== session.user.id) {
    return {
      message: null,
      errors: { url: ["Link not found or unauthorized"] },
    };
  }

  await db.link.update({
    where: { id },
    data: {
      url,
      shortUrl,
      description,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Link updated successfully",
  };
}

export async function deleteLink(id: string) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const link = await db.link.findUnique({
    where: { id },
  });

  if (!link || link.userId !== session.user.id) {
    throw new Error("Link not found or unauthorized");
  }

  await db.link.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
}
