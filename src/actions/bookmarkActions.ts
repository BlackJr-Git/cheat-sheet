"use server";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export async function getBookmarksAction(bookmarksList: number[]) {
  try {
    const bookmarks = await Prisma.tool.findMany({
      where: {
        id: {
          in: bookmarksList,
        },
      },
    });
    return bookmarks;
  } catch (error) {
    console.log(error);
  }
}
