import { UserRoles } from "@prisma/client";

export const AdminRoles = [UserRoles.ADMIN, UserRoles.SUB_ADMIN];

export const CompanyRoles = [
  UserRoles.OWNER,
  UserRoles.MODERATOR,
  UserRoles.RECRUITER,
];
