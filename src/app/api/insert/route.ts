import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { ToolType } from "@/types";

const prisma = new PrismaClient();

const categories = [
  {
      "id": 1,
      "name": "AI",
      "icon": "🤖",
      "tools": []
  },
  {
      "id": 2,
      "name": "UX",
      "icon": "🧑‍🔧",
      "tools": []
  },
  {
      "id": 3,
      "name": "Photos",
      "icon": "📸",
      "tools": []
  },
  {
      "id": 4,
      "name": "Developement",
      "icon": "🧑‍💻",
      "tools": []
  },
  {
      "id": 5,
      "name": "Design",
      "icon": "🧑‍🎨",
      "tools": []
  },
  {
      "id": 6,
      "name": "Video",
      "icon": "🎬",
      "tools": []
  },
  {
      "id": 7,
      "name": "UI",
      "icon": "🏙️",
      "tools": []
  },
  {
      "id": 8,
      "name": "Creation de contenus",
      "icon": "✍️",
      "tools": []
  },
  {
      "id": 9,
      "name": "Gestion de projets",
      "icon": "📝",
      "tools": []
  },
  {
      "id": 10,
      "name": "Developer API",
      "icon": "💻",
      "tools": []
  },
  {
      "id": 11,
      "name": "No Code",
      "icon": "🖱️",
      "tools": []
  },
  {
      "id": 12,
      "name": "Hebergement web",
      "icon": "🪩",
      "tools": []
  }
]

export async function POST(req: NextRequest, res: NextResponse) {
  for (const tool of categories) {
    await prisma.category.create({
      data : {
        name: tool.name,
        icon: tool.icon
      }
    });
  }
  // console.log('Tous les enregistrements ont été insérés avec succès!');
  return NextResponse.json(
    "Tous les enregistrements ont été insérés avec succès!"
  );
}
