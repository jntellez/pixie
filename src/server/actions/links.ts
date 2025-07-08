"use server";

import { db } from "@/server/utils/db";
import { CreateLinkSchema } from "../schemas";
import { nanoid } from "nanoid";

export type State = {
  errors?: {
    url?: string[];
    shortUrl?: string[];
  };
  message?: string | null;
  shortUrl?: string;
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
      errors: {
        url: fieldErrors.url,
        shortUrl: fieldErrors.shortUrl,
      },
      message: "Error de validación",
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
      message: "Enlace creado exitosamente",
      shortUrl: link.shortUrl,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      message: "Hubo un error al crear el enlace",
      errors: {
        shortUrl: ["Este enlace ya existe o no es válido."],
      },
    };
  }
}
