"use client";

import { BoardLayoutWrapper } from "@/components/layout/Board/BoardLayout";
import { signOut, useSession } from "next-auth/react";
import { PropsWithChildren, type FC } from "react";

type Props = {
  params: {
    industry: string;
    category: string;
  };
};

const BoardLayout: FC<PropsWithChildren & Props> = (props) => {
  const { children, params } = props;
  const session = useSession();

  return (
    <BoardLayoutWrapper
      user={session.data?.user}
      onSignOutClick={signOut}
      activeCategory={params.category}
      industry={params.industry}
    >
      {children}
    </BoardLayoutWrapper>
  );
};

export default BoardLayout;
