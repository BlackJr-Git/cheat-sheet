"use server";
import client from "@/lib/contentful";

export async function getBlogArticles() {
  try {
    const entries = await client.getEntries({
      content_type: "cheatSheetArticle",
    });
    return entries;
  } catch (error) {
    console.log(error);
  }
}
