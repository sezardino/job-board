"use client";

import { PropsWithChildren } from "react";

import { LandingLayout } from "@/components/layout";
import { useProfileContext } from "@/context";
import { useLogout } from "@/hooks/use-logout";

const BaseLayout = (props: PropsWithChildren) => {
  const { children } = props;
  const user = useProfileContext();
  const logout = useLogout();

  return (
    <LandingLayout user={user.profile} onSignOutClick={logout}>
      {children}
    </LandingLayout>
  );
};

export default BaseLayout;
