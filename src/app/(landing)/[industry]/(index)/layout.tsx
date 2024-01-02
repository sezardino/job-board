import { BoardLayoutWrapper } from "@/components/layout/Board/BoardLayout";
import { PropsWithChildren, type FC } from "react";

type Props = {
  params: {
    industry: string;
  };
};

const BoardLayout: FC<PropsWithChildren & Props> = (props) => {
  const { children, params } = props;

  return (
    <BoardLayoutWrapper industry={params.industry}>
      {children}
    </BoardLayoutWrapper>
  );
};

export default BoardLayout;
