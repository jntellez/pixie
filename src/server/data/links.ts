"use server";

import { auth } from "@/auth";
import { db } from "@/server/utils/db";
import { Link } from "@prisma/client";

export async function getUserLinks() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return db.link.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
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
