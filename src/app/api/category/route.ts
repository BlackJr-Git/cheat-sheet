import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ToolType } from "@/types";

const Prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const number = searchParams.get("number");
    const pages = searchParams.get("pages");

    const totalCategories = await Prisma.category.count();
    const pageSize = parseInt(number as string, 10) || 1;
    const currentPage = parseInt(pages as string, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    const categories = await Prisma.category.findMany({
      skip,
      take: pageSize,
      include: { tools: true },
    });

    const response = {
      categories: categories.slice(skip, skip + pageSize),
      totalCategories,
      pageSize,
      currentPage,
      totalPages: Math.ceil(totalCategories / pageSize),
    };
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "No category provided" },
        { status: 400 }
      );
    }

    const newCategory = {
      name: body.name,
      icon: body.icon,
    };

    const createdCategory = await Prisma.category.create({ data: newCategory });

    return NextResponse.json(createdCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    await Prisma.category.deleteMany();
    return NextResponse.json({ message: "All categories deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
