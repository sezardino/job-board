"use client";

import { AdminPageUrls, CompanyPageUrls } from "@/const/url";
import { PropsWithChildren, useMemo } from "react";

import { AppSidebarItem } from "@/components/UI/AppSidebar/AppSidebar";
import { PanelLayout } from "@/components/layout/PanelLayout/PanelLayout";
import { CompanyPagesProvider } from "@/context";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

const CompanyPanelLayout = (props: PropsWithChildren) => {
  const { children } = props;
  const session = useSession();
  const t = useTranslations("layout.app");

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

  if (!session.data) return null;

  return (
    <PanelLayout
      email={session.data.user.email}
      homeHref={AdminPageUrls.home}
      lists={lists}
      onSignOutClick={signOut}
      avatar={undefined}
    >
      <CompanyPagesProvider>{children}</CompanyPagesProvider>
    </PanelLayout>
  );
};

export default CompanyPanelLayout;
