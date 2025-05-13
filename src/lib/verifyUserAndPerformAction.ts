import prisma from './prisma';
import { currentUser } from '@clerk/nextjs/server';

/**
 * Verifies if a user exists in the database and creates them if they don't,
 * then performs the specified action
 * 
 * @param actionFn - The function to execute after user verification
 * @returns The result of the action function
 */
export async function verifyUserAndPerformAction<T>(
  actionFn: (userId: string) => Promise<T>
): Promise<T> {
  // Get the current user from Clerk
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    throw new Error('Authentication required');
  }

  try {
    // Check if user exists in the database
    let user = await prisma.user.findUnique({
      where: { id: clerkUser.id }
    });

    // If user doesn't exist, create them with data from Clerk
    if (!user) {
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      const name = clerkUser.firstName && clerkUser.lastName 
        ? `${clerkUser.firstName} ${clerkUser.lastName}` 
        : clerkUser.username || 'User';
      
      user = await prisma.user.create({
        data: {
          id: clerkUser.id,
          email,
          name,
          image: clerkUser.imageUrl
        }
      });
      
      console.log(`Created new user with ID: ${clerkUser.id}`);
    }

    // Perform the action with the verified user ID
    return await actionFn(user.id);
  } catch (error) {
    console.error('Error in verifyUserAndPerformAction:', error);
    throw error;
  }
}
