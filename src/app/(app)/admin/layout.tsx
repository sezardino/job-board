"use client";

import { AdminPageUrls } from "@/const/url";
import { PropsWithChildren, useMemo } from "react";

import { AppNavbar, AppSidebar, AppSidebarItem } from "@/components";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import styles from "./layout.module.css";

const DashboardLayout = (props: PropsWithChildren) => {
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

  // if (!session.data) return null;

  return (
    <>
      <div
        className={twMerge(
          styles.element,
          "min-h-screen antialiased bg-gray-50"
        )}
      >
        <AppNavbar
          // TODO: update
          copy={{ logout: "Logout", userMenu: "User Menu" }}
          onSignOutClick={() => undefined}
          // TODO: add image to profile
          avatarSrc={undefined}
          // login={session.data.user.login}
          login="admin"
          className={styles.navbar}
        />

        <AppSidebar
          copy={{
            closeSidebar: "Close Sidebar",
            openSidebar: "Open Sidebar",
            title: "Sidebar",
          }}
          lists={lists}
          className={twMerge(styles.sidebar)}
          brandHref={AdminPageUrls.home}
        />
        <main className={twMerge(styles.content, "p-4 h-auto")}>
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
