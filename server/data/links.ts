import { db } from "../utils/db";

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
