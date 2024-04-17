"use client";

import { FC, PropsWithChildren } from "react";

import { CategoryPagesProvider } from "@/context";

type Props = {
  params: {
    categoryId: string;
  };
};

type CategoryPagesLayoutProps = PropsWithChildren & Props;

const CategoryPagesLayout: FC<CategoryPagesLayoutProps> = (props) => {
  const { children, params } = props;

  return (
    <CategoryPagesProvider categoryId={params.categoryId}>
      {children}
    </CategoryPagesProvider>
  );
};

export default CategoryPagesLayout;
