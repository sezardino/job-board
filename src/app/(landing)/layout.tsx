"use client";

import { PropsWithChildren } from "react";

import { LandingLayout } from "@/components/layout";
import { signOut, useSession } from "next-auth/react";

const BaseLayout = (props: PropsWithChildren) => {
  const { children } = props;
  const session = useSession();

  return (
    <LandingLayout
      user={
        session.data?.user
          ? {
              avatar: null,
              email: session.data.user.email,
              name: session.data.user.name,
            }
          : undefined
      }
      onSignOutClick={signOut}
    >
      {children}
    </LandingLayout>
  );
};

export default BaseLayout;
