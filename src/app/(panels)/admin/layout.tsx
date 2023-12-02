"use client";

import { AdminPageUrls } from "@/const/url";
import { PropsWithChildren, useMemo } from "react";

import { AppSidebarItem } from "@/components";
import { AppWrapper } from "@/components/layout/AppWrapper/AppWrapper";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

const AdminPanelLayout = (props: PropsWithChildren) => {
  const { children } = props;
  const session = useSession();
  const t = useTranslations("layout.app");

  const lists = useMemo<AppSidebarItem[][]>(
    () => [
      [
        {
          label: t("dashboard"),
          icon: "HiOutlineHome",
          to: AdminPageUrls.home,
        },
        {
          label: t("industries"),
          icon: "HiOutlineShoppingBag",
          to: AdminPageUrls.industries,
        },
        {
          label: t("companies"),
          icon: "HiOutlineUserGroup",
          to: AdminPageUrls.companies,
        },
      ],
    ],
    [t]
  );

  if (!session.data) return null;

  return (
    <AppWrapper
      email={session.data.user.email}
      homeHref={AdminPageUrls.home}
      lists={lists}
      onSignOutClick={() => undefined}
      avatar={undefined}
    >
      {children}
    </AppWrapper>
  );
};

export default AdminPanelLayout;