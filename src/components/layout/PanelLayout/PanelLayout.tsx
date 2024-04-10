"use client";

import { FC, PropsWithChildren } from "react";

import { AppNavbar } from "@/components/UI/AppNavbar/AppNavbar";
import {
  AppSidebar,
  AppSidebarItem,
} from "@/components/UI/AppSidebar/AppSidebar";
import { twMerge } from "tailwind-merge";
import styles from "./PanelLayout.module.scss";

type Props = {
  lists: AppSidebarItem[][];
  homeHref: string;
  onSignOutClick: () => void;
  avatar?: string;
  email: string;
};

type PanelLayoutProps = PropsWithChildren<Props>;

export const PanelLayout: FC<PanelLayoutProps> = (props) => {
  const { lists, homeHref, avatar, email, onSignOutClick, children } = props;

  return (
    <div
      className={twMerge(styles.element, "min-h-screen antialiased bg-gray-50")}
    >
      <AppNavbar
        // TODO: update
        copy={{ logout: "Logout", userMenu: "User Menu" }}
        onSignOutClick={onSignOutClick}
        avatarSrc={avatar}
        email={email}
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
        brandHref={homeHref}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
