"use client";

import { AdminPageUrls, CompanyPageUrls } from "@/const/url";
import { PropsWithChildren, useMemo } from "react";

import { AppSidebarItem } from "@/components/UI/AppSidebar/AppSidebar";
import { PanelLayout } from "@/components/layout/PanelLayout/PanelLayout";
import { CompanyPagesProvider, useProfileContext } from "@/context";
import { useTranslations } from "next-intl";
import { useLogout } from "@/hooks/useLogout";

const CompanyPanelLayout = (props: PropsWithChildren) => {
  const { children } = props;
  const user = useProfileContext();
  const t = useTranslations("layout.app");
  const logout = useLogout();

  const lists = useMemo<AppSidebarItem[][]>(
    () => [
      [
        {
          label: t("company.dashboard"),
          icon: "HiOutlineHome",
          to: CompanyPageUrls.home,
        },
        {
          label: t("company.users"),
          icon: "HiOutlineUser",
          to: CompanyPageUrls.users,
        },
        {
          label: t("company.offers"),
          icon: "HiOutlineBriefcase",
          to: CompanyPageUrls.offers,
        },
        {
          label: t("company.profile"),
          icon: "TbPolaroidFilled",
          to: CompanyPageUrls.profile,
        },
      ],
    ],
    [t]
  );

  if (!user) return null;

  return (
    <PanelLayout
      user={user}
      homeHref={AdminPageUrls.home}
      lists={lists}
      onSignOutClick={logout}
    >
      <CompanyPagesProvider>{children}</CompanyPagesProvider>
    </PanelLayout>
  );
};

export default CompanyPanelLayout;
