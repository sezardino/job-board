"use client";

import { BoardLayoutWrapper } from "@/components/layout/Board/BoardLayout";
import { signOut, useSession } from "next-auth/react";
import { PropsWithChildren, type FC } from "react";

type Props = {
  params: {
    industry: string;
  };
};

const BoardLayout: FC<PropsWithChildren & Props> = (props) => {
  const { children, params } = props;
  const session = useSession();

  return (
    <BoardLayoutWrapper
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
      industry={params.industry}
    >
      {children}
    </BoardLayoutWrapper>
  );
};

export default BoardLayout;
