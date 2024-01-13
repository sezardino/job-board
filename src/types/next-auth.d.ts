import { UserRoles } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    companyId?: string;
    avatar?: string;
    role: UserRoles;
    id: string;
  }

  interface Session {
    user: User;
  }
}
