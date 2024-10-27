// app/actions/search.js
"use server";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export async function searchCategories(query = "" as string) {
  if (!query) return [];

  try {
    const categories = await Prisma.category.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    return categories;
  } catch (error) {
    console.error("Erreur de connexion à la base de données :", error);
    return []; // Retourne une valeur par défaut en cas d'erreur.
  }
}
