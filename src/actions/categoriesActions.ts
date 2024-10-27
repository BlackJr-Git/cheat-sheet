"use server";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export async function getToolCategories(toolSlug: string) {
  try {
    const toolCategories = await Prisma.tool.findMany({
      where: { slug: toolSlug },
      include: {
        categories: {
          select: {
            category: {
              // Récupère les détails de la catégorie
              select: {
                id: true,
                name: true,
                icon: true,
              },
            },
          },
        },
      },
    });

    return toolCategories[0];
  } catch (error) {
    console.log(error);
  }
}
