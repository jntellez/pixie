"use server";

import { db } from "@/server/utils/db";
import { Link } from "@prisma/client";

export async function getUserLinks(userId: string) {
  try {
    const links = await db.link.findMany({
      where: {
        userId: userId,
      },
    });

    return links;
  } catch (error) {
    console.error("Error al recuperar los links del usuario:", error);
    throw new Error("No se pudieron recuperar los links del usuario.");
  }
}

export async function getLinkByShortUrl(
  shortUrl: string
): Promise<Link | null> {
  const link = await db.link.findUnique({
    where: { shortUrl },
  });

  if (!link) {
    return null;
  }

  return link;
}
