import { BoardLayoutWrapper } from "@/components/layout/Board/BoardLayout";
import { PropsWithChildren, type FC } from "react";

type Props = {
  params: {
    industry: string;
    category: string;
  };
};

const BoardLayout: FC<PropsWithChildren & Props> = (props) => {
  const { children, params } = props;

  return (
    <BoardLayoutWrapper
      activeCategory={params.category}
      industry={params.industry}
    >
      {children}
    </BoardLayoutWrapper>
  );
};

export default BoardLayout;
