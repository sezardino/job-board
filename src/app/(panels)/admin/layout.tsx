"use client";

import { AdminPageUrls } from "@/const/url";
import { PropsWithChildren, useMemo } from "react";

import { AppSidebarItem } from "@/components/UI/AppSidebar/AppSidebar";
import { PanelLayout } from "@/components/layout/PanelLayout/PanelLayout";
import { useProfileContext } from "@/context";
import { useLogout } from "@/hooks/use-logout";
import { useTranslations } from "next-intl";

const AdminPanelLayout = (props: PropsWithChildren) => {
  const { children } = props;
  const user = useProfileContext();
  const t = useTranslations("layout.app");
  const logout = useLogout();

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

  if (!user) return null;

  return (
    <PanelLayout
      user={user.profile}
      homeHref={AdminPageUrls.home}
      lists={lists}
      onSignOutClick={logout}
    >
      {children}
    </PanelLayout>
  );
};

export default AdminPanelLayout;
