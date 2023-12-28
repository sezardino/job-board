"use client";

import { FC, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";
import { AppNavbar, AppSidebar, AppSidebarItem } from "..";
import styles from "./AppWrapper.module.css";

type Props = {
  lists: AppSidebarItem[][];
  homeHref: string;
  onSignOutClick: () => void;
  avatar?: string;
  email: string;
};

type AppWrapperProps = PropsWithChildren<Props>;

export const AppWrapper: FC<AppWrapperProps> = (props) => {
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
      <div className={twMerge(styles.content, "p-4 h-auto")}>{children}</div>
    </div>
  );
};
