import prisma from './prisma';
import { User } from '@clerk/nextjs/server';

/**
 * Verifies if a user exists in the database and creates them if they don't
 * @param clerkUser - The Clerk user object
 * @returns The user from the database
 */
export async function verifyUserExists(clerkUser: User) {
  if (!clerkUser) {
    throw new Error('No user provided');
  }

  // Extract user information from Clerk
  const userId = clerkUser.id;
  const email = clerkUser.emailAddresses[0]?.emailAddress;
  const name = clerkUser.firstName && clerkUser.lastName 
    ? `${clerkUser.firstName} ${clerkUser.lastName}` 
    : clerkUser.username || 'User';
  const image = clerkUser.imageUrl;

  try {
    // Check if user exists in the database
    let user = await prisma.user.findUnique({
      where: { id: userId }
    });

    // If user doesn't exist, create them
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email,
          name,
          image
        }
      });
      console.log(`Created new user with ID: ${userId}`);
    }

    return user;
  } catch (error) {
    console.error('Error verifying user existence:', error);
    throw error;
  }
}

/**
 * Higher-order function that wraps an action with user verification
 * @param clerkUser - The Clerk user object
 * @param action - The action to perform after user verification
 * @returns The result of the action
 */
export async function withUserVerification<T>(
  clerkUser: User, 
  action: (userId: string) => Promise<T>
): Promise<T> {
  // Verify user exists (or create them)
  const user = await verifyUserExists(clerkUser);
  
  // Perform the action with the verified user ID
  return action(user.id);
}
