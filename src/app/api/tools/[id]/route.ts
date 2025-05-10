import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { ToolType } from "@/types";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Check if id is a number or a slug
    const isNumeric = /^\d+$/.test(id);
    
    let tool;
    if (isNumeric) {
      // If id is numeric, search by id
      tool = await prisma.tool.findUnique({
        where: { id: parseInt(id, 10) },
        include: { 
          categories: {
            include: {
              category: true
            }
          } 
        },
      });
    } else {
      // If id is not numeric, search by slug
      tool = await prisma.tool.findFirst({
        where: { slug: id },
        include: { 
          categories: {
            include: {
              category: true
            }
          } 
        },
      });
    }

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    // const toolCategories = await prisma.toolCategory.findMany({
    //   where: { toolId: parseInt(id, 10) },
    //   include: { category: true },
    // });

    return NextResponse.json(tool);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  const { title, description, url, image, published } = body;

  if (!id) {
    return NextResponse.json({ error: "Tool ID is required" }, { status: 400 });
  }

  try {
    const updatedTool = await prisma.tool.update({
      where: { id: parseInt(id, 10) },
      data: { title, description, url, image, published },
    });

    if (!updatedTool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Tool updated", tool: updatedTool });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Tool not found" }, { status: 404 });
      }
    } else {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Tool ID is required" }, { status: 400 });
  }

  try {
    const deletedTool = await prisma.tool.delete({
      where: { id: parseInt(id, 10) },
    });

    if (!deletedTool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Tool deleted", tool: deletedTool });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
