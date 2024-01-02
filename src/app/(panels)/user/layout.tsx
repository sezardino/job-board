"use client";

import { AdminPageUrls, UserPageUrls } from "@/const/url";
import { PropsWithChildren, useMemo } from "react";

import { AppSidebarItem } from "@/components/UI/AppSidebar/AppSidebar";
import { PanelLayout } from "@/components/layout/PanelLayout/PanelLayout";
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
          to: UserPageUrls.home,
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
      onSignOutClick={() => undefined}
      avatar={undefined}
    >
      {children}
    </PanelLayout>
  );
};

export default AdminPanelLayout;
