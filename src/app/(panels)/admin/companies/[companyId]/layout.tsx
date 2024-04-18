"use client";

import { FC, PropsWithChildren } from "react";

import { CompanyPagesProvider } from "@/context";

type Props = {
  params: {
    companyId: string;
  };
};

type CompanyPagesLayoutProps = PropsWithChildren & Props;

const CompanyPagesLayout: FC<CompanyPagesLayoutProps> = (props) => {
  const { children, params } = props;

  return (
    <CompanyPagesProvider companyId={params.companyId}>
      {children}
    </CompanyPagesProvider>
  );
};

export default CompanyPagesLayout;
