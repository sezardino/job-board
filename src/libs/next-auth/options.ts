import { ProjectPageUrls } from "@/const/url";
import { serverService } from "@/services/server";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "login", placeholder: "login" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.login || !credentials.password)
          return null;

        const { login, password } = credentials;

        try {
          const user = await serverService.auth.controller.login({
            login,
            password,
          });

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },

  pages: {
    signIn: ProjectPageUrls.login,
    error: ProjectPageUrls.login,
  },

  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          login: token.login,
        },
      };
    },

    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          login: user.login,
          name: user.name,
        };
      }
      return token;
    },
  },
};
