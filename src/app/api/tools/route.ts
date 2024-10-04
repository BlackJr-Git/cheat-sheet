import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ToolType } from "@/types";

const Prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const number = searchParams.get("number");
    const pages = searchParams.get("pages");
    const orderby = searchParams.get("orderby");

    const totalTools = await Prisma.tool.count();
    const pageSize = parseInt(number as string, 10) || 4;
    const currentPage = parseInt(pages as string, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    let tools = [];

    if (orderby) {
      tools = await Prisma.tool.findMany({
        skip,
        take: pageSize,
        where: {
          published: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          userLikes: true,
          categories: {
            include: {
              category: true,
            }
          }
        }
      });
    } else {
      tools = await Prisma.tool.findMany({
        skip,
        take: pageSize,
        where: {
          published: true,
        },
      });
    }

    const response = {
      tools: tools.slice(skip, skip + pageSize),
      totalTools,
      pageSize,
      currentPage,
      totalPages: Math.ceil(totalTools / pageSize),
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
      return NextResponse.json({ error: "No tool provided" }, { status: 400 });
    }

    const newTool = {
      title: body.title,
      description: body.description,
      url: body.url,
      image: body.image,
      published: body.published,
    };

    const createdTool = await Prisma.tool.create({ data: newTool });

    return NextResponse.json(createdTool);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    await Prisma.tool.deleteMany();
    return NextResponse.json({ message: "All tools deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
