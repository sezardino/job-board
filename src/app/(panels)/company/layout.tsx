"use client";

import { AdminPageUrls, CompanyPageUrls } from "@/const/url";
import { PropsWithChildren, useMemo } from "react";

import { AppSidebarItem } from "@/components/layout";
import { AppWrapper } from "@/components/layout/AppWrapper/AppWrapper";
import { MyCompanyProvider } from "@/context";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

const AdminPanelLayout = (props: PropsWithChildren) => {
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
          label: t("company.offers"),
          icon: "HiOutlineBriefcase",
          to: CompanyPageUrls.offers,
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
      onSignOutClick={signOut}
      avatar={undefined}
    >
      <MyCompanyProvider>{children}</MyCompanyProvider>
    </AppWrapper>
  );
};

export default AdminPanelLayout;
