import type { NextAuthOptions } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/app/actions";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const options: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email:",
          min: 1,
          type: "email",
          placeholder: "Email",
        },
        password: { label: "Password", type: "password", min: 1 },
      },
      async authorize(credentials) {
        try {
          const user = await signIn({
            email: credentials?.email,
            password: credentials?.password,
          });
          return user;
        } catch (err) {
          throw new Error("Failed to log in");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.email = user.email;
        token.id = user._id;
      }
      // Console log after adding user data (optional)
      console.log("Updated Token => ", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.email = token.email;
        }
      }
      // Console log after potential updates (optional)
      console.log("Updated Session => ", session);
      return session;
    },
  },
};
