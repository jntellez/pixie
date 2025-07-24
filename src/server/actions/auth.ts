"use server";

import { auth } from "@/auth";
import { db } from "@/server/utils/db";

export async function updateUserName(name: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { name },
  });
}

export async function deleteAccount() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await db.user.delete({
    where: { id: session.user.id },
  });
}
