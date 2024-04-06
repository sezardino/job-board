"use client";

import { LandingNavbar } from "@/components/UI/LandingNavbar/LandingNavbar";
import { User } from "next-auth";
import { FC, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

type Props = {
  user?: User;
  onSignOutClick: () => void;
};

type LandingLayoutProps = PropsWithChildren<Props>;

export const LandingLayout: FC<LandingLayoutProps> = (props) => {
  const { user, onSignOutClick, children } = props;

  return (
    <div className={twMerge("min-h-screen antialiased bg-gray-50")}>
      <LandingNavbar user={user} onSignOutClick={onSignOutClick} />
      <main className={twMerge("container h-auto")}>{children}</main>
    </div>
  );
};
