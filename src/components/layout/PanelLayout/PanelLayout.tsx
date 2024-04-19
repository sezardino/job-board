"use client";

import { FC, PropsWithChildren } from "react";

import {
  AppSidebar,
  AppSidebarItem,
} from "@/components/UI/AppSidebar/AppSidebar";
import { LandingNavbar } from "@/components/UI/LandingNavbar/LandingNavbar";
import { User } from "next-auth";
import { twMerge } from "tailwind-merge";
import styles from "./PanelLayout.module.scss";

type Props = {
  lists: AppSidebarItem[][];
  homeHref: string;
  onSignOutClick: () => void;
  user?: User;
};

type PanelLayoutProps = PropsWithChildren<Props>;

export const PanelLayout: FC<PanelLayoutProps> = (props) => {
  const { lists, homeHref, user, onSignOutClick, children } = props;

  return (
    <div
      className={twMerge(styles.element, "min-h-screen antialiased bg-gray-50")}
    >
      <LandingNavbar
        user={user}
        onSignOutClick={onSignOutClick}
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
