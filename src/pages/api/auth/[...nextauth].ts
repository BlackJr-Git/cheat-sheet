import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email || null,  // Vérifiez ici si l'email est présent
          image: profile.avatar_url
        }
      },
      // scope: 'user:email'  // Permet de demander les emails
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/sign-in', // custom sign-in page (optional)
  },
  callbacks: {
    async session({ session, user, token }) {
      // if (session?.user) {
      //   session.user.id = token.sub;
      // }
      return session;
    },
    async signIn({ account, profile }) {
      console.log('Account:', account);
      console.log('Profile:', profile);
      return true;  // Permet de continuer l'inscription
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;  // redirige vers la page principale après authentification
    }
  },
  secret: process.env.NEXTAUTH_SECRET, // secret key for signing JWT

  debug: true,
}); 