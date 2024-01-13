"use client";

import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { WindowNavigation } from "@/components/base/WindowNavigation/WindowNavigation";
import { AdminPageUrls } from "@/const";
import { UserRoles } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { PropsWithChildren, type FC } from "react";

const AdminUsersLayout: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations("layout.admin-users");
  const session = useSession();

  return (
    <div className="grid grid-cols-1 gap-4">
      <TitleDescription
        title={t("title")}
        titleLevel="h1"
        description={t("description")}
      />

      <WindowNavigation
        items={[
          { title: t("navigation.companies"), href: AdminPageUrls.users },
          { title: t("navigation.customers"), href: AdminPageUrls.customers },
          {
            title: t("navigation.admins"),
            href: AdminPageUrls.admins,
            disabled: session?.data?.user.role !== UserRoles.ADMIN,
          },
        ]}
        title={t("navigation.title")}
      />

      <main className="container">{children}</main>
    </div>
  );
};

export default AdminUsersLayout;
