import { NextResponse } from 'next/server';
import { verifyUserAndPerformAction } from '@/lib/verifyUserAndPerformAction';
import prisma from '@/lib/prisma';

// POST /api/user/bookmark - Bookmark a tool
export async function POST(request: Request) {
  try {
    const { toolId } = await request.json();
    
    if (!toolId) {
      return NextResponse.json(
        { error: 'Tool ID is required' }, 
        { status: 400 }
      );
    }

    // Verify user exists (or create them) and then perform the bookmark action
    const result = await verifyUserAndPerformAction(async (userId) => {
      // Check if the bookmark already exists
      const existingBookmark = await prisma.userTool.findUnique({
        where: {
          userId_toolId: {
            userId,
            toolId
          }
        }
      });

      if (existingBookmark) {
        return { message: 'Tool already bookmarked' };
      }

      // Create the bookmark
      await prisma.userTool.create({
        data: {
          userId,
          toolId
        }
      });

      return { success: true, message: 'Tool bookmarked successfully' };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error bookmarking tool:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// DELETE /api/user/bookmark?toolId=123 - Remove a bookmark
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

    // Verify user exists (or create them) and then perform the unbookmark action
    const result = await verifyUserAndPerformAction(async (userId) => {
      try {
        // Delete the bookmark
        await prisma.userTool.delete({
          where: {
            userId_toolId: {
              userId,
              toolId
            }
          }
        });
        
        return { success: true, message: 'Bookmark removed successfully' };
      } catch (error) {
        // Handle case where bookmark doesn't exist
        return { success: false, message: 'Bookmark not found' };
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
