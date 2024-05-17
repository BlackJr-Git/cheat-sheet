import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();
type ToolType = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  published: boolean;
  //   categories: string[];
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const number = searchParams.get("number");
    const pages = searchParams.get("pages");

    const totalTools = await Prisma.tool.count();
    const pageSize = parseInt(number as string, 10) || 4;
    const currentPage = parseInt(pages as string, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    const tools: ToolType[] = await Prisma.tool.findMany({
      skip,
      take: pageSize,
      include: {
        categories: true,
      }
      //   where: {
      //     published: true,
      //   } 
    });

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
