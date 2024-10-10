import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Récupérer les paramètres de pagination depuis l'URL (exemple : ?page=1&pageSize=10)
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10); // Page actuelle
    const pageSize = parseInt(searchParams.get("pageSize") || "12", 10); // Nombre d'éléments par page

    const skip = (page - 1) * pageSize; // Calculer le nombre d'éléments à ignorer
    const take = pageSize; // Nombre d'éléments à récupérer

    // Requête Prisma pour récupérer la catégorie avec outils paginés
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        tools: {
          include: { tool: true },
          skip: skip,
          take: take,
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Compter le nombre total d'outils pour cette catégorie
    const totalTools = await prisma.toolCategory.count({
      where: { categoryId: parseInt(id, 10) },
    });

    // Retourner les informations de la catégorie avec la pagination
    return NextResponse.json({
      category,
      pagination: {
        total: totalTools,
        page: page,
        pageSize: pageSize,
        totalPages: Math.ceil(totalTools / pageSize),
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // Requête Prisma pour supprimer la catégorie avec tous ses outils
    const deletedCategory = await prisma.category.delete({
      where: { id: parseInt(id, 10) },
    });

    if (!deletedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Category deleted",
      category: deletedCategory,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
