import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "No tool provided and category provided" },
        { status: 400 }
      );
    }

    const newToolCategory = {
      toolId: parseInt(body.toolId),
      categoryId: parseInt(body.categoryId),
    };

    const addedToolCategory = await Prisma.toolCategory.create({
      data: newToolCategory,
      include: { tool: true, category: true },
    });

    return NextResponse.json(addedToolCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
