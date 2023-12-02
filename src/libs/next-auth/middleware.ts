import { PublicPageUrls } from "@/const";
import { NextAuthMiddlewareOptions } from "next-auth/middleware";

const publicRoutes = [PublicPageUrls.home, PublicPageUrls.login];

export const nextAuthMiddleware: NextAuthMiddlewareOptions = {
  callbacks: {
    authorized: ({ req, token }) => {
      const currentPathName = req.nextUrl.pathname;

      const isPublicRoute = publicRoutes.some((route) =>
        currentPathName.startsWith(route)
      );

      if (!isPublicRoute && token === null) {
        return false;
      }

      return true;
    },
  },
};

export default nextAuthMiddleware;
