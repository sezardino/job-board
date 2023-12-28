"use client";

import { PropsWithChildren } from "react";

import { LandingWrapper } from "@/components/layout";
import { signOut, useSession } from "next-auth/react";

const LandingLayout = (props: PropsWithChildren) => {
  const { children } = props;
  const session = useSession();

  return (
    <LandingWrapper
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
    </LandingWrapper>
  );
};

export default LandingLayout;
