"use client";

import { PropsWithChildren } from "react";

import { LandingLayout } from "@/components/layout";
import { signOut, useSession } from "next-auth/react";

const BaseLayout = (props: PropsWithChildren) => {
  const { children } = props;
  const { data } = useSession();

  return (
    <LandingLayout user={data?.user} onSignOutClick={signOut}>
      {children}
    </LandingLayout>
  );
};

export default BaseLayout;
