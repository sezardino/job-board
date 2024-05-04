"use client";

import { BoardLayoutWrapper } from "@/components/layout/Board/BoardLayout";
import { useProfileContext } from "@/context";
import { useLogout } from "@/hooks/use-logout";
import { PropsWithChildren, type FC } from "react";

type Props = {
  params: {
    industry: string;
    category: string;
  };
};

const BoardLayout: FC<PropsWithChildren & Props> = (props) => {
  const { children, params } = props;
  const user = useProfileContext();
  const logout = useLogout();

  return (
    <BoardLayoutWrapper
      user={user.profile}
      onSignOutClick={logout}
      activeCategory={params.category}
      industry={params.industry}
    >
      {children}
    </BoardLayoutWrapper>
  );
};

export default BoardLayout;
