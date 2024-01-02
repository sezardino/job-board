"use client";

import { AdminPageUrls } from "@/const/url";
import { PropsWithChildren, useMemo } from "react";

import { PanelLayout } from "@/components/layout/PanelLayout/PanelLayout";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { AppSidebarItem } from "@/components/UI/AppSidebar/AppSidebar";

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
          icon: "HiOutlineOfficeBuilding",
          to: AdminPageUrls.companies,
        },
        {
          label: t("users"),
          icon: "HiOutlineUserGroup",
          to: AdminPageUrls.users,
        },
      ],
    ],
    [t]
  );

  if (!session.data) return null;

  return (
    <PanelLayout
      email={session.data.user.email}
      homeHref={AdminPageUrls.home}
      lists={lists}
      onSignOutClick={signOut}
      avatar={undefined}
    >
      {children}
    </PanelLayout>
  );
};

export default AdminPanelLayout;
