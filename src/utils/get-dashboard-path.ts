import { AdminPageUrls, CompanyPageUrls, PublicPageUrls } from "@/const";
import { UserRoles } from "@prisma/client";

export const getDashboardPath = (role: UserRoles) => {
  switch (role) {
    case UserRoles.ADMIN:
    case UserRoles.SUB_ADMIN:
      return AdminPageUrls.home;
    case UserRoles.MODERATOR:
    case UserRoles.OWNER:
    case UserRoles.RECRUITER:
      return CompanyPageUrls.home;
    default:
      return PublicPageUrls.home;
  }
};
