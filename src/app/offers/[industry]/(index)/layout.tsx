"use client";

import { BoardLayoutWrapper } from "@/components/layout/Board/BoardLayout";
import { useProfileContext } from "@/context";
import { useLogout } from "@/hooks/useLogout";
import { PropsWithChildren, type FC } from "react";

type Props = {
  params: {
    industry: string;
  };
};

const BoardLayout: FC<PropsWithChildren & Props> = (props) => {
  const { children, params } = props;
  const user = useProfileContext();
  const logout = useLogout();

  return (
    <BoardLayoutWrapper
      user={user}
      onSignOutClick={logout}
      industry={params.industry}
    >
      {children}
    </BoardLayoutWrapper>
  );
};

export default BoardLayout;
