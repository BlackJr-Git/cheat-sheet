import { NextResponse } from 'next/server';
import { verifyUserAndPerformAction } from '@/lib/verifyUserAndPerformAction';
import prisma from '@/lib/prisma';

// POST /api/user/like - Like a tool
export async function POST(request: Request) {
  try {
    const { toolId } = await request.json();
    
    if (!toolId) {
      return NextResponse.json(
        { error: 'Tool ID is required' }, 
        { status: 400 }
      );
    }

    // Verify user exists (or create them) and then perform the like action
    const result = await verifyUserAndPerformAction(async (userId) => {
      // Check if the like already exists
      const existingLike = await prisma.likedTool.findUnique({
        where: {
          userId_toolId: {
            userId,
            toolId
          }
        }
      });

      if (existingLike) {
        return { message: 'Tool already liked' };
      }

      // Create the like
      await prisma.likedTool.create({
        data: {
          userId,
          toolId
        }
      });

      return { success: true, message: 'Tool liked successfully' };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error liking tool:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// DELETE /api/user/like?toolId=123 - Unlike a tool
export async function DELETE(request: Request) {
  try {
    // Get toolId from URL query parameters
    const url = new URL(request.url);
    const toolIdParam = url.searchParams.get('toolId');
    
    if (!toolIdParam) {
      return NextResponse.json(
        { error: 'Tool ID is required as a query parameter' }, 
        { status: 400 }
      );
    }
    
    const toolId = Number(toolIdParam);
    
    if (isNaN(toolId)) {
      return NextResponse.json(
        { error: 'Invalid tool ID' }, 
        { status: 400 }
      );
    }

    // Verify user exists (or create them) and then perform the unlike action
    const result = await verifyUserAndPerformAction(async (userId) => {
      try {
        // Delete the like
        await prisma.likedTool.delete({
          where: {
            userId_toolId: {
              userId,
              toolId
            }
          }
        });
        
        return { success: true, message: 'Tool unliked successfully' };
      } catch (error) {
        // Handle case where like doesn't exist
        return { success: false, message: 'Like not found' };
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error unliking tool:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
