import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// // import { ToolType } from "@/types";

// const prisma = new PrismaClient();

const categories = [
  {
    id: 1,
    name: "AI",
    icon: "🤖",
    tools: [],
  },
  {
    id: 2,
    name: "UX",
    icon: "🧑‍🔧",
    tools: [],
  },
  {
    id: 3,
    name: "Photos",
    icon: "📸",
    tools: [],
  },
  {
    id: 4,
    name: "Developement",
    icon: "🧑‍💻",
    tools: [],
  },
  {
    id: 5,
    name: "Design",
    icon: "🧑‍🎨",
    tools: [],
  },
  {
    id: 6,
    name: "Video",
    icon: "🎬",
    tools: [],
  },
  {
    id: 7,
    name: "UI",
    icon: "🏙️",
    tools: [],
  },
  {
    id: 8,
    name: "Creation de contenus",
    icon: "✍️",
    tools: [],
  },
  {
    id: 9,
    name: "Gestion de projets",
    icon: "📝",
    tools: [],
  },
  {
    id: 10,
    name: "Developer API",
    icon: "💻",
    tools: [],
  },
  {
    id: 11,
    name: "No Code",
    icon: "🖱️",
    tools: [],
  },
  {
    id: 12,
    name: "Hebergement web",
    icon: "🪩",
    tools: [],
  },
];

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  // Récupérer le dernier ID utilisé
  const lastTool = await prisma.tool.findFirst({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
    },
  });

  const nextId = lastTool ? lastTool.id + 1 : 1;

  // Ajuster la séquence (exemple pour PostgreSQL)
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Tool"', 'id'), ${nextId}, true);`;

  NextResponse.json({
    message: `Auto-increment adjusted to start from ${nextId}`,
  });
}
