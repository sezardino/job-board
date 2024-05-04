import { NextAuthMiddlewareOptions } from "next-auth/middleware";

export const nextAuthMiddleware: NextAuthMiddlewareOptions = {
  callbacks: {
    authorized: () => true,
  },
};
