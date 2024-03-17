import { PublicPageUrls } from "@/const/url";
import { bllService } from "@/services/bll";
import {
  LoginRequest,
  loginRequestSchema,
  LoginResponse,
} from "@/services/bll/modules/auth/schema";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const loginHandler = async (body: LoginRequest) => {
  const validation = loginRequestSchema.safeParse(body);

  if (!validation.success) {
    throw new Error("Invalid request");
  }

  try {
    const res = await bllService.auth.login(validation.data);

    if (typeof res === "string") return { status: res } as LoginResponse;

    return res as LoginResponse;
  } catch (error) {
    return null;
  }
};

export const nextAuthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          return Promise.reject({ message: "no credentials" });

        try {
          const res = await loginHandler(credentials);

          if (res && "id" in res) return res;

          if (res && "status" in res)
            return Promise.reject({ message: res.status });

          return Promise.reject({ message: "not found" });
        } catch (error) {
          return Promise.reject(error);
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
    signIn: PublicPageUrls.login,
    error: PublicPageUrls.login,
    signOut: PublicPageUrls.login,
  },

  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          companyId: token.companyId,
          id: token.id,
          avatar: token.avatar,
          email: token.email,
          role: token.role,
        },
      };
    },

    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          companyId: user.companyId,
          avatar: token.avatar,
          email: user.email,
          role: user.role,
        };
      }
      return token;
    },
  },
};
