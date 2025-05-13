import { NextResponse } from 'next/server';
import { verifyUserAndPerformAction } from '@/lib/verifyUserAndPerformAction';
import prisma from '@/lib/prisma';

// GET /api/user/me - Get current user information
export async function GET() {
  try {
    // Verify user exists (or create them) and then fetch their data
    const result = await verifyUserAndPerformAction(async (userId) => {
      // Get user with their bookmarks and likes
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          favTools: {
            include: {
              tool: true
            }
          },
          likedTools: {
            include: {
              tool: true
            }
          }
        }
      });
      
      return user;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching current user:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
