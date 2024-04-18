"use client";

import { IndustryPagesProvider } from "@/context";
import { FC, PropsWithChildren } from "react";

type Props = {
  params: {
    industryId: string;
  };
};

type IndustryPagesLayoutProps = PropsWithChildren & Props;

const IndustryPagesLayout: FC<IndustryPagesLayoutProps> = (props) => {
  const { children, params } = props;

  return (
    <IndustryPagesProvider industryId={params.industryId}>
      {children}
    </IndustryPagesProvider>
  );
};

export default IndustryPagesLayout;
