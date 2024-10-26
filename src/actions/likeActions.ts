"use server";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();



export async function likeTool(toolId: number) {
    try {
        // await Prisma.tool.update({
        //     where: { id: toolId },
        //     // data: { likes: { increment: 1 } },
        // });
    } catch (error) {
        console.log(error);
    }
}
