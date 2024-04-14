"use client";

import { WindowNavigation } from "@/components/base/WindowNavigation/WindowNavigation";
import { PreviewTemplateWrapper } from "@/components/modules/shared/PreviewTemplateWrapper/PreviewTemplateWrapper";
import { AdminPageUrls } from "@/const";
import { UserRoles } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { PropsWithChildren, type FC } from "react";

const AdminUsersLayout: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations("layout.admin-users");
  const session = useSession();

  return (
    <PreviewTemplateWrapper
      tag="div"
      copy={{
        title: t("title"),
        description: t("description"),
      }}
      breadcrumbs={[
        { label: t("breadcrumbs.home"), href: AdminPageUrls.home },
        { label: t("breadcrumbs.users") },
      ]}
    >
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

      <main>{children}</main>
    </PreviewTemplateWrapper>
  );
};

export default AdminUsersLayout;
