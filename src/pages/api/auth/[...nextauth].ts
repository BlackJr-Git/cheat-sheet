import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import prisma from "@/lib/prisma"
import { PrismaClient } from "@prisma/client"
import GithubProvider from "next-auth/providers/github"


const prisma = new PrismaClient() 

const authConfig = {
  providers : [ 
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      // authorization: {
      //   params: {
      //     redirect_uri: "http://localhost:3000/api/auth/callback/github",
      //   },
      // },
    })
  ],
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions


export default NextAuth(authConfig)

// const prisma = new PrismaClient()

// export default NextAuth({
//   providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
// })